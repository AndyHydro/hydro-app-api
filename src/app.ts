import express from 'express'
import awsServerlessExpressMiddleware from 'aws-serverless-express/middleware'
import bodyParser from 'body-parser'
import 'reflect-metadata'

import ClientController from './routes/client'
import handleAuth from './auth/handleAuth'
import welcome from './routes/welcome'
import handle404 from './errors/handle404'
import handleError from './errors/handleError'

const app: express.Application = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(awsServerlessExpressMiddleware.eventContext())

// handle auth
app.use('/', handleAuth)

// define routes
app.use('/welcome', welcome)
app.use('/client', ClientController)

// catch 404s and forward to error handler
app.use(handle404)

// handle errors
app.use(handleError)

export default app
