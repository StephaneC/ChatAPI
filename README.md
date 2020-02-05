# TchatAPI
Let's rewrite the [ApiCesi](https://github.com/StephaneC/ApiCesi) using typescript and deployed on AWS Lambda.

## Entrypoints
### Signup
* url:[https://suoqix3gpa.execute-api.eu-west-3.amazonaws.com/dev/signup](https://suoqix3gpa.execute-api.eu-west-3.amazonaws.com/dev/signup)
* method: POST
* params format : `application/x-www-form-urlencoded`
* params: 
    1. username
    2. password
    3. urlPhoto (optionnal)
* return 
`{
    "success": true
}`

### Signin
* url:[https://suoqix3gpa.execute-api.eu-west-3.amazonaws.com/dev/signin](https://suoqix3gpa.execute-api.eu-west-3.amazonaws.com/dev/signin)
* method: POST
* params format : `application/x-www-form-urlencoded`
* params: 
    1. username
    2. password
* return 
`{
    "success": true,
    "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1ODA4ODc2MzcsImV4cCI6MTU4MDg5MTIzN30.5JOaUtouyqkmtZIfvCZdKVg4s31DYO2m-ZFb1uqT0aM"
}`

### Add Messages
* url:[https://suoqix3gpa.execute-api.eu-west-3.amazonaws.com/dev/messages](https://suoqix3gpa.execute-api.eu-west-3.amazonaws.com/dev/messages)
* method: POST
* headers: `Authorization: Bearer [JWT_TOKEN]`
* params format : `application/x-www-form-urlencoded`
* params: 
    1. text
* return 
`{
    "success": true
}`
## Scripts
`npm install`
`npm run test`