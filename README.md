# hydro-app-api
Express API to be hosted in AWS lambda.

Be sure that you have an `.aws/credentials` file that includes:

```
[default]
aws_access_key_id = <YOUR_ID_HERE>
aws_secret_access_key = <YOUR_KEY_HERE>
```

# Running locally
First, install a global copy of [aws-sam-cli](https://github.com/awslabs/aws-sam-cli), including Docker. Then, run

- `npm start`
