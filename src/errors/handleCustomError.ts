import { Response } from 'express'

export function customError(message: any, status: number, res: Response) {
  res.status(status || 400).json(message)
}
