import { Request } from 'express'

export const getEnvironment = (req: Request) => {
  return req.apiGateway.context.invokedFunctionArn.replace(/.*:/g, '')
}
