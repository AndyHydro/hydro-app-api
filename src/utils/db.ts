import { getConnectionManager, ConnectionManager, Connection, ConnectionOptions } from 'typeorm'

import { Signature } from '../entity/Signature'
import { ApplicationClientMapping } from '../entity/ApplicationClientMapping'

const databaseOptions: ConnectionOptions = {
  type:     "mysql",
  host:     process.env.db_host,
  port:     Number(process.env.db_port),
  username: process.env.db_username,
  password: process.env.db_password,
  database: process.env.db_database,
  entities: [
    Signature,
    ApplicationClientMapping
  ]
}

const connectionManager: ConnectionManager = getConnectionManager()
const connection: Connection = connectionManager.create(databaseOptions)

let connectionError: object | undefined
const connecting = connection.connect()
  .then(error => {
    connectionError = error
    return null
  })

export const withConnection: Function = async (connectionFunction: Function): Promise<any> => {
  await connecting
  if (connecting === null) throw connectionError
  return connectionFunction(connection)
}
