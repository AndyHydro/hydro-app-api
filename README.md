# hydro-app-api
Express API to be hosted in AWS lambda

# Running locally
1. `npm run watch`
2. `npm start`

# Deployment
To authenticate with your AWS credentials, make an `.aws/credentials` file that includes:

```
[default]
aws_access_key_id = <YOUR_ID_HERE>
aws_secret_access_key = <YOUR_KEY_HERE>
```

Then:

1. `npm update`
