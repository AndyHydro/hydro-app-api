import { Request, Response } from 'express'

export default (err: any, _req: Request, res: Response, _next: Function) => {
  console.log('Handling Error...')
  console.error(err)

  res.sendStatus(err.status || 500)
}
