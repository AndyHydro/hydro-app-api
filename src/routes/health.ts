import { Router, Request, Response } from 'express'

const router: Router = Router()

router.get('/', (_req: Request, res: Response) => {
  return res.send(`Hello!`)
})

export default router
