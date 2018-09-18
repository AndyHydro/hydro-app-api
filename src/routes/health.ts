import { Router, Request, Response } from 'express'

import { getEnvironment, getConfig } from '../utils'

const router: Router = Router()

router.get('/', async (req: Request, res: Response) => {
  const environment = getEnvironment(req)

  const version = await getConfig(environment, 'info.app.version')
    .catch((error: Error) => error)
  if (version instanceof Error) return res.sendStatus(500)

  res.status(200).json({version: version, environment: environment})
})

export default router
