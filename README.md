
# Foundations Project
## Startup
To start...
## Endpoints
## Login Endpoint
### Request
- HTTP Method
    - POST
- URL
    - /login
- Headers
    - Content-Type: application/json
- Body
    ```JSON
    "username": "user123",
    "password": "password"
    ```
### Response Scenarios
1. Valid username and password provided in request body
- Status Code
    - 200 OK
- Body
    ```JSON
    "message": "succuessful login"
    "token": "password"
    ```
- Headers
    - Content-Type: applications/json

2. Invalid username
- Status Code
    - 400 Bad Request
- Body
    ```JSON
    "message": "Invalid username"
    ```
- Headers
    - Content-Type: applications/json

3. Invalid Password, valid username
- Status Code
    - 401 Bad Request
- Body
    ```JSON
    "message": "Invalid password"
    ```
- Headers
    - Content-Type: applications/json
## Registration Endpoint
### Request
- HTTP Method
    - POST
- URL
    - /register
- Headers
    - Content-Type: application/json
    
- Body
    ```JSON
    "username": "newuser123",
    "password": "password",
    "email": "newuser123@gmail.com",
    "profile_picture": "mypic.jpg",
    "phone_number": 7032663003,
    "zipcode1": 20151,
    "street_address": "8888 Pine Rd",
    "state": "Ohio",
    "city": "Cleveland"
    "full_name": "Test User Again",
    "email": "user000@gmail.com",
    ```
### Response Scenarios
1. Successful registration
- Status Code
    - 201 Created
- Body
    ```JSON
    "message": "Successfully registered."
    ```
- Headers
    - Content-Type: applications/json

2. Unsuccessful registration because username is already taken
- Status Code
    - 400 Bad Request
- Body
    ```JSON
    "message": "This username is taken, please try again."
    ```
- Headers
    - Content-Type: applications/json

3. Unsuccessful registration because user with the given email already exists
- Status Code
    - 400 Bad Request
- Body
    ```JSON
     "message": "Email is already taken, please try again.`
    ```
- Headers
    - Content-Type: applications/json

5. Server Error
- Status Code
    - 500 Bad Request
- Body
    ```JSON
    "message": "err"
    ```
- Headers
    - Content-Type: applications/json


