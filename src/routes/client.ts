import { Router, Request, Response } from 'express';
import { body, validationResult } from 'express-validator/check'
import { Connection } from 'typeorm'

import { withConnection } from '../db'
import { Signature } from '../entity/Signature'

const router: Router = Router()

const args = [
  body('signature').isLength({min: 132, max: 132}),
  body('username').isLength({min: 4}),
  body('application_id').isUUID()
]

router.post('/signature', args, async (req: Request, res: Response, next: Function) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() })
    }

    withConnection((connection: Connection) => {
      const signatureRepository = connection.manager.getRepository(Signature)
      const newSignature = signatureRepository.create(req.body)

      return signatureRepository.save(newSignature)
        .then(() => {
          return res.json(newSignature)
        })
    })
      .catch((error: any) => {
        return next(error)
      })
})

export default router
