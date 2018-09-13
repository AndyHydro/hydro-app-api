import { Router, Request, Response } from 'express';
import { body, validationResult } from 'express-validator/check';
import { getManager } from 'typeorm';
import { Signature } from '../entity/Signature';

const router: Router = Router();

router.post('/signature', [
  body('signature').isLength({min: 132, max: 132}),
  body('username').isLength({min: 4}),
  body('application_id').isUUID()
], (req: Request, res: Response) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const signatureRepository = getManager().getRepository(Signature);
    const newSignature = signatureRepository.create(req.body);
    signatureRepository.save(newSignature).then(function() {
        res.send(newSignature);
    })
});

export const ClientController: Router = router;
