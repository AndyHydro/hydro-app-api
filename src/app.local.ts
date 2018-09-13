import { readFileSync } from 'fs'

const configVariables = JSON.parse(readFileSync('./config.json').toString())

Object.keys(configVariables).forEach(variable => {
  process.env[variable] = configVariables[variable]
})

import app from './app'

const port: number = Number(process.env.PORT) || 3000

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/`)
})
