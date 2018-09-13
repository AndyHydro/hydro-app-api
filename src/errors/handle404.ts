import { Request, Response } from 'express'

export default (_req: Request, res: Response, _next: Function) => {
  res.sendStatus(404)
}
