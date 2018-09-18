import { Request } from 'express'
import { createConnection, Connection, ConnectionOptions } from 'typeorm'

import { getConfig } from '../utils'
import { Signature } from '../entity/Signature'
import { ApplicationClientMapping } from '../entity/ApplicationClientMapping'
import { VerificationLog } from '../entity/VerificationLog'

export const withConnection: Function = async (req: Request, connectionFunction: Function): Promise<any> => {
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

  const databaseOptions: ConnectionOptions = {
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

  const connection: Connection = await createConnection(databaseOptions)

  // let connectionError: object | undefined
  // const connecting = connection.connect()
  //   .then(error => {
  //     connectionError = error
  //     return null
  //   })
  //
  // await connecting
  // if (connecting === null) throw connectionError
  
  return connectionFunction(connection)
}
