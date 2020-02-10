# TchatAPI
Let's rewrite the [ApiCesi](https://github.com/StephaneC/ApiCesi) using typescript and deployed on AWS Lambda.

## Entrypoints
### Signup
* url: [https://suoqix3gpa.execute-api.eu-west-3.amazonaws.com/dev/signup](https://suoqix3gpa.execute-api.eu-west-3.amazonaws.com/dev/signup)
* method: POST
* params format : `application/x-www-form-urlencoded`
* params: 
    1. username
    2. pwd
    3. urlPhoto (optionnal)
* return 
`{
    "success": true
}`

### Signin
* url: [https://suoqix3gpa.execute-api.eu-west-3.amazonaws.com/dev/signin](https://suoqix3gpa.execute-api.eu-west-3.amazonaws.com/dev/signin)
* method: POST
* params format : `application/x-www-form-urlencoded`
* params: 
    1. username
    2. pwd
* return 
`{
    "success": true,
    "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1ODA4ODc2MzcsImV4cCI6MTU4MDg5MTIzN30.5JOaUtouyqkmtZIfvCZdKVg4s31DYO2m-ZFb1uqT0aM"
}`

### Add Messages
* url: [https://suoqix3gpa.execute-api.eu-west-3.amazonaws.com/dev/messages](https://suoqix3gpa.execute-api.eu-west-3.amazonaws.com/dev/messages)
* method: POST
* headers: `Authorization: Bearer [JWT_TOKEN]`
* params format : `application/x-www-form-urlencoded`
* params: 
    1. message
* return 
`{
    "success": true,
    "message": {
        "message": "first message",
        "id": "_8vcjckqt3",
        "username": "test",
        "done": false,
        "ts": 1580889904731
    }
}`

### Get Messages
* url: [https://suoqix3gpa.execute-api.eu-west-3.amazonaws.com/dev/messages](https://suoqix3gpa.execute-api.eu-west-3.amazonaws.com/dev/messages)
* method: GET
* headers: `Authorization: Bearer [JWT_TOKEN]`
* return 
`{
    "success": true,
    "messages": [
        {
            "ts": 1580889999778,
            "username": "test",
            "message": "first message",
            "id": "_eljwe9ouw",
            "done": false
        },
        {
            "ts": 1580890495479,
            "username": "test",
            "message": "second message",
            "id": "_f7awk5ycz",
            "done": false
        }
    ]
}`


## Scripts
`npm install`
`npm run test`
