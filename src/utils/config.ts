import { Request } from 'express'
import { load } from 'cloud-config-client'
import { PropertiesFile } from 'java-properties'

import { getEnvironment } from './'

type Environment = 'test' | 'dev' | 'qa' | 'sandbox' | 'prod'

// fetch local config
const localConfig = new PropertiesFile('application.properties')
let config = localConfig

// fetch cloud config
let cloudConfigStatus: Environment | undefined
async function fetchCloudConfig (environment: Environment) {
  if (cloudConfigStatus !== environment) {
    await load({
      endpoint: config.get('config.server.endpoint'),
      name:     config.get('config.server.name'),
      profiles: `eks${environment}`,
      auth:     {
        user: config.get('config.server.user'),
        pass: config.get('config.server.pass')
      }
    })
      .then((cloudConfig: any) => {
        // config = localConfig
        cloudConfig.forEach((key: string, value: string) => {
          config.set(key, value)
        })

        cloudConfigStatus = environment
      })
      .catch((error: Error) => {
        console.error(error)
        cloudConfigStatus = undefined
      })
  }
}

// get config
export async function getConfig (req: Request, variables: string[] | string): Promise<string[] | string> {
  const environment: Environment = getEnvironment(req)
  console.log(environment)

  if (environment !== 'test') {
    await fetchCloudConfig(environment)
    if (cloudConfigStatus === undefined) {
      throw Error('Could not fetch cloud config.')
    }
  }

  return Array.isArray(variables) ? variables.map(v => config.get(v)) : config.get(variables)
}
