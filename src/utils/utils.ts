import { Request } from 'express'
import uuid from 'uuid/v4'

export function getEnvironment (req: Request) {
  return req.apiGateway.context.invokedFunctionArn.replace(/.*:/g, '')
}

export function newUUID() {
  return uuid()
}
