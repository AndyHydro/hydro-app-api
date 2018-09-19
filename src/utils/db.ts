import { Request } from 'express'
import { getConnectionManager, ConnectionManager, Connection, ConnectionOptions } from 'typeorm'

import { getConfig, getEnvironment } from '../utils'
import { Signature } from '../entity/Signature'
import { ApplicationClientMapping } from '../entity/ApplicationClientMapping'
import { VerificationLog } from '../entity/VerificationLog'

export async function withConnection(req: Request, connectionFunction: Function): Promise<any> {
  const dbConfigVars: string[] = [
    'hydro.apiDataSource.driverType',
    'hydro.db.host',
    'hydro.db.port',
    'hydro.apiDataSource.username',
    'hydro.apiDataSource.password',
    'db.name.hydro_api'
  ]

  const configVars: any = await getConfig(req, dbConfigVars)
    .catch((error: Error) => error)
  if (configVars instanceof Error) throw configVars
  const [ driver, host, port, user, pass, database ] = configVars

  const environment = getEnvironment(req)

  const manager: ConnectionManager = getConnectionManager()
  let connection: Connection
  if (manager.has(environment)) {
    connection = manager.get(environment)
  } else {
    const databaseOptions: ConnectionOptions = {
      name:     environment,
      type:     driver,
      host:     host,
      port:     Number(port),
      username: user,
      password: pass,
      database: database,
      entities: [
        Signature,
        ApplicationClientMapping,
        VerificationLog
      ]
    }
    connection = manager.create(databaseOptions)
    await connection.connect()
  }

  return connectionFunction(connection)
}
