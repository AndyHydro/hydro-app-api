import { Router, Request, Response } from 'express'
import { body, validationResult } from 'express-validator/check'
import { Connection } from 'typeorm'
import Web3 from 'web3'
import { getEnvironment, getConfig } from '../utils'
import { parseSignature } from '../utils/web3-utils'

import { withConnection } from '../utils/db'
import { Signature } from '../entity/Signature'
import { ApplicationClientMapping } from '../entity/ApplicationClientMapping'
import { VerificationLog } from '../entity/VerificationLog'

import { customError } from '../errors/handleCustomError'
import * as Errors from '../constants/errors'

const router: Router = Router()

const verifyArguments = [
  body('message').isLength({min: 6, max: 6}).withMessage('Please pass a message of the correct length.'),
  body('hydro_id').isByteLength({min: 4, max: 30}).withMessage('Please pass a username of the correct byte length.'),
  body('application_id').isUUID()
]

router.post('/', verifyArguments, (req: Request, res: Response, next: Function) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) return customError(errors.array(), 400, res)

  withConnection(async (req: Request, connection: Connection) => {
    const applicationClientMappingRepository = connection.manager.getRepository(ApplicationClientMapping)
    const signatureRepository = connection.manager.getRepository(Signature)
    const verificationLogRespository = connection.manager.getRepository(VerificationLog)

    const environment = getEnvironment(req)
    const [provider, clientRaindropAddress, clientRaindropABI] = await getConfig(environment, ['url.networkURL.infura', 'clientRaindrop.address', 'clientRaindrop.ABI'])
      .catch((error: Error) => error)

    let mapping = await applicationClientMappingRepository.findOne({hydro_id: req.body.username, application_id: req.body.application_id})
    if (!mapping){
      return customError(Errors.applicationClientMappingDoesntExist, 400, res)
    }

    let existingSignature = await signatureRepository.findOne({username: req.body.hydro_id, application_id: req.body.application_id})
    if (!existingSignature) {
      return customError(Errors.signatureDoesntExist, 400, res)
    }

    const web3 = new Web3(provider)

    const clientRaindrop = new web3.eth.Contract(clientRaindropABI, clientRaindropAddress)
    let {userAddress} = await clientRaindrop.methods.getUserByName(req.body.hydro_id).call();
    if (!userAddress) {
      return customError(Errors.hydroIdDoesntExist, 400, res)
    }

    let {r: r, s: s, v: v} = parseSignature(provider, existingSignature.signature)
    let isSigned = await clientRaindrop.methods.isSigned(userAddress, web3.utils.keccak256(req.body.message), v, r, s).call();

    let verification = verificationLogRespository.create({signature: existingSignature.signature, username: req.body.hydro_id, verified: isSigned, application_id: req.body.application_id})
    await verificationLogRespository.save(verification)

    res.status(200).json(verification)

  }).catch((error: any) => {
      return next(error)
  })
})

export default router
