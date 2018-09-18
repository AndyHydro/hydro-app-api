import { load } from 'cloud-config-client'
import { PropertiesFile } from 'java-properties'

type Environment = 'test' | 'dev' | 'qa' | 'sandbox' | 'prod'

// from https://basarat.gitbooks.io/typescript/docs/types/literal-types.html
const strEnum = <T extends string>(o: Array<T>): {[K in T]: K} => {
  return o.reduce((res, key) => {
    res[key] = key
    return res
  }, Object.create(null))
}
const Variables = strEnum(['info.app.version', "hydro.apiDataSource.driverType"])
type Variables = keyof typeof Variables

let validationError: Error | undefined
const validateProperties = (properties: any) => {
  const propertiesKeys = properties.getKeys()
  const missingKeys: string[] = Object.keys(Variables)
    .filter((key: string) => !propertiesKeys.includes(key))

  if (missingKeys.length !== 0) {
    validationError = Error(`Required key(s) missing from config: '${missingKeys.join("', '")}'`)
  }
}

// fetch local config
const config = new PropertiesFile('application.properties')
validateProperties(config)

// fetch cloud config
let cloudConfigStatus: Environment | undefined
const fetchCloudConfig = async (environment: Environment) => {
  if (cloudConfigStatus !== environment) {
    await load({
      endpoint: config.get('config.server.endpoint'),
      name:     config.get('config.server.name'),
      profiles: `eks${environment}`,
      auth:     {user: config.get('config.server.user'), pass: config.get('config.server.pass') }
    })
      .then((cloudConfig: any) => {
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
export const getConfig = async (environment: Environment, variables: Variables | Variables[]): Promise<any> => {
  if (validationError !== undefined) {
    throw validationError
  }

  if (environment !== 'test') {
    await fetchCloudConfig(environment)
    if (cloudConfigStatus === undefined) {
      throw Error('Could not fetch cloud config.')
    }
  }

  return Array.isArray(variables) ? variables.map(v => config.get(v)) : config.get(variables)
}
