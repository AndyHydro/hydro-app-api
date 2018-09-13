import { Router, Request, Response } from 'express'

const router: Router = Router()

router.get('/:name', (req: Request, res: Response) => {
  let { name } = req.params

  return res.send(`Hello, ${name}! What's up?`)
})

export default router
