import { Request } from 'express'

export function getEnvironment (req: Request) {
  return req.apiGateway.context.invokedFunctionArn.replace(/.*:/g, '')
}
