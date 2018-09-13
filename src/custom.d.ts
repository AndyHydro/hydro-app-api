declare namespace Express {
  export interface Request {
    auth: any       // from express-jwt                       in src/auth/handleAuth.ts
    apiGateway: any // from aws-serverless-express/middleware in src/app.ts
  }
}
