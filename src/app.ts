import express from 'express'
import awsServerlessExpressMiddleware from 'aws-serverless-express/middleware'
import bodyParser from 'body-parser'
import 'reflect-metadata'

import ClientController from './routes/client'
import VerifySignature from './routes/verifySignature'
import handleAuth from './auth/handleAuth'
import health from './routes/health'
import handle404 from './errors/handle404'
import handleError from './errors/handleError'

const app: express.Application = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(awsServerlessExpressMiddleware.eventContext())

// handle auth
app.use('/', handleAuth)

// define routes
app.use('/health', health)
app.use('/client', ClientController)
app.use('/verify_signature', VerifySignature)

// catch 404s and forward to error handler
app.use(handle404)

// handle errors
app.use(handleError)

export default app
