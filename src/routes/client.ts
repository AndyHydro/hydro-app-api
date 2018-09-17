import { Router, Request, Response } from 'express';
import { body, validationResult } from 'express-validator/check'
import { Connection } from 'typeorm'

import { withConnection } from '../utils/db'
import { Signature } from '../entity/Signature'

const router: Router = Router()

// handle /signature calls
const signatureArguments = [
  body('signature').isLength({min: 132, max: 132}).withMessage('Please pass a signature of the correct length.'),
  body('username').isByteLength({min: 4, max: 30}).withMessage('Please pass a username of the correct byte length.'),
  body('application_id').isUUID()
]

router.post('/signature', signatureArguments, (req: Request, res: Response, next: Function) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) res.status(422).json(errors.array())

  withConnection((connection: Connection) => {
    const signatureRepository = connection.manager.getRepository(Signature)
    const newSignature = signatureRepository.create(req.body)

    return signatureRepository.save(newSignature)
      .then((signatures: Signature[]) => {
        res.json(signatures)
      })
  })
    .catch((error: any) => {
      next(error)
    })
})

export default router
