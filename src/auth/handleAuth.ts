import { Router, Request, Response } from 'express'
import jwt from 'express-jwt'

import publicKey from './publicKey'

const router: Router = Router()

router.all('*', jwt({secret: publicKey, requestProperty: 'auth'}), (_req: Request, _res: Response, next: Function) => {
  next()
})

export default router
