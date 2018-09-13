import awsServerlessExpress from 'aws-serverless-express'
import { Server } from 'http'

import app from './app'

const server: Server = awsServerlessExpress.createServer(app)

export const handler = (event: any, context: any) => awsServerlessExpress.proxy(server, event, context)
