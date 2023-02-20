
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

## Request "reset password email" Endpoint
### Request
- HTTP Method
    - POST
- URL
    - /password
- Headers
    - Content-Type: application/json
    
- Body
```JSON
"email": "email@gmail.com"
```
### Response Scenarios
1. Successful registration
- Status Code
    - 201 Created
- Body
    ```JSON
    "message": "Successful."
    ```
- Headers
    - Content-Type: applications/json

2. Invalid email, email does not exist within our database
-Status code
    - 400 Bad Request
- Body
    ```JSON
    "message": "There is no user with the email email@gmail.com"
    ```
- Headers
    - Content-Type: applications/json

## Reset Password Endpoint
### Request
- HTTP Method
    - PATCH
- URL
    - /password
- Headers
    - Content-Type: application/json
    
- Body
```JSON
"token" : "271dbsadhasl9OKASDL"
"username": "user123"
"password": "password"
```
### Response Scenarios
1. Successful password reset
- Status Code
    - 201 Created
- Body
    ```JSON
    "message": "Successfully reset user123 password"
    ```
- Headers
    - Content-Type: applications/json

2. Invalid reset token, username does not match token payload username
-Status code
    - 400 Bad Request
- Body
    ```JSON
    "message": "you do not have permission to reset user user123's password"
    ```
- Headers
    - Content-Type: applications/json

## View Profile Endpoint
### Request
- HTTP Method
    - GET
- URL
    - /customer/profile
- Headers
    - Content-Type: application/json
    - Bearer Token - User
    
- Body
    N/A
### Response Scenarios
1. Successful
- Status Code
    - 200 Created
- Body
    ```JSON
    
    "password": "$2b$10$CAEy9swrgnSSs6ClHGX9/esMR0ChH2SbGYT9G9JYffMa4RE33xIE.",
    "profile_picture": "mypic",
    "role": "user",
    "phone_number": 8888888888,
    "username": "user000",
    "address": {
        "zipcode1": 11111,
        "street_address": "8888 Pine Rd",
        "state": "Ohio",
        "city": "Cleveland"
    },
    "full_name": "Test User Again",
    "email": "user000@gmail.com",
    "credit_card_info": {
        "expiration": 128,
        "security_code": 348,
        "card_number": 1434384324,
        "zipcode2": 12321
    }

    ```
- Headers
    - Content-Type: applications/json

## Edit Profile Endpoint
### Request
- HTTP Method
    - PATCH
- URL
    - /update/profile
- Headers
    - Content-Type: application/json
    - Bearer Token - User
    
- Body
    ```JSON
    
    "password": "$2b$10$CAEy9swrgnSSs6ClHGX9/esMR0ChH2SbGYT9G9JYffMa4RE33xIE.",
    "profile_picture": "mypic",
    "role": "user",
    "phone_number": 8888888888,
    "username": "user000",
    "address": {
        "zipcode1": 11111,
        "street_address": "8888 Pine Rd",
        "state": "Ohio",
        "city": "Cleveland"
    },
    "full_name": "Test User Again",
    "email": "user000@gmail.com",
    "credit_card_info": {
        "expiration": 128,
        "security_code": 348,
        "card_number": 1434384324,
        "zipcode2": 12321
    }
    ```

### Response Scenarios
1. Successfully updated user profile attribute(s)
- Status Code
    - 200 Created
- Body
    ```JSON
    "message": "Successfully updated profile"
    ```
- Headers
    - Content-Type: applications/json

## Add to Cart Endpoint
### Request
- HTTP Method
    - POST
- URL
    - /cart
- Headers
    - Content-Type: application/json
    - Bearer Token - Guest or User
    
- Body
    ```JSON
    "product_number"
    ```
### Response Scenarios
1. Successfully added item to cart
- Status Code
    - 201 
- Body
    ```JSON
    "message": "Added 'product name' to your cart"
    ```
- Headers
    - Content-Type: applications/json
2. Successfuly added multiple copies of item (item count)
- Status Code
    - 201 
- Body
    ```JSON
    "message": "Added another copy of 'product name' to your cart"
    ```
- Headers
    - Content-Type: applications/json
3. Invalid JWT
- Status Code
    - 400
- Body
    ```JSON
    "message": "Invalid JWT"
    ```
- Headers
    - Content-Type: applications/json
4. Server error
- Status Code
    - 500
- Body
    ```JSON
    "message": "error"
    ```
- Headers
    - Content-Type: applications/json

## Add to Cart Endpoint
### Request
- HTTP Method
    - GET
- URL
    - /cart
- Headers
    - Content-Type: application/json
    - Bearer Token - Guest or User
    
- Body
    ```JSON
    "product_number"
    ```