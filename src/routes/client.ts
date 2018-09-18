import { Router, Request, Response } from 'express';
import { body, validationResult } from 'express-validator/check'
import { Connection } from 'typeorm'

import { withConnection } from '../utils/db'
import { Signature } from '../entity/Signature'
import { ApplicationClientMapping } from '../entity/ApplicationClientMapping'

import { customError } from '../errors/handleCustomError'
import * as Errors from '../constants/errors'

const router: Router = Router()

// handle /signature calls
const signatureArguments = [
  body('signature').isLength({min: 132, max: 132}).withMessage('Please pass a signature of the correct length.'),
  body('username').isByteLength({min: 4, max: 30}).withMessage('Please pass a username of the correct byte length.'),
  body('application_id').isUUID()
]

router.post('/signature', signatureArguments, (req: Request, res: Response, next: Function) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) return customError(errors.array(), 400, res)

    withConnection(req, async (connection: Connection) => {
      const applicationClientMappingRepository = connection.manager.getRepository(ApplicationClientMapping)
      const signatureRepository = connection.manager.getRepository(Signature)

      let mapping = await applicationClientMappingRepository.findOne({hydro_id: req.body.username, application_id: req.body.application_id})
      if (!mapping){
        return customError(Errors.applicationClientMappingDoesntExist, 400, res)
      }

      let existingSignature = await signatureRepository.findOne({username: req.body.username, application_id: req.body.application_id})

      if (existingSignature) {
        existingSignature.signature = req.body.signature
        await signatureRepository.save(existingSignature)
        return res.json(existingSignature)
      } else {
        const newSignature = signatureRepository.create(req.body)
        await signatureRepository.save(newSignature)
        return res.json(newSignature)
      }
    }).catch((error: any) => {
        return next(error)
    })
})

export default router
