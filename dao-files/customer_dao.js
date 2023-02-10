//Contains user-related functions handling user login and registration:
const AWS = require('aws-sdk');

AWS.config.update({
    region: 'us-east-1'
});

const docClient = new AWS.DynamoDB.DocumentClient();


//Function to retrieve Username from Customer Table in DB:
function retrieveUserName(username) {

    const params = {

        TableName: 'customers',
        Key: {

            'username': username
        }

    }

    return docClient.get(params).promise();

}

//TEST RETRIEVEUSERNAME FUNCTION: WORKS!
// retrieveUserName('1').then(data => {
//     console.log(data.Item);
// })

function retrieveUserEmail(email){

    const params = {

        TableName: 'customers',
        IndexName : 'email-index',
        KeyConditionExpression: '#c = :value',
        ExpressionAttributeNames: {'#c': 'email'},
        ExpressionAttributeValues: {':value': email} 
    }

    return docClient.query(params).promise();

}

//TEST RETRIEVEUSEREMAIL FUNCTION:
// retrieveUserEmail('1').then(data => {
//     console.log(data.Item);
// })


//Function to register a new user account:
function registerNewUser(username, street_address, city, state, zipcode1, last4digits, expiration, security_code, zipcode2, email, full_name, profile_picture, password, phone_number) {

    const params = {

        TableName: "customers",
        Item: {
            "username": username,
            "address": {
                "street_address": street_address,
                "city": city,
                "state": state,
                "zipcode": zipcode1
            },
            "credit_card_info": {
                "last4digits": last4digits,
                "expiration": expiration,
                "security_code": security_code,
                "zipcode": zipcode2
            },
            "email": email,
            "full_name": full_name,
            "profile_picture": profile_picture,
            "password": password,
            "phone_number": phone_number,
            "role": "user"
        }
    }

    return docClient.put(params).promise();
}

//Testing 'registerNewUser' function: WORKS!
// registerNewUser('kimnamjoon', '123 My Street', 'Orlando', 'FL', 75312, 8521, 0323, 42564, 'thisisanemail@emails.com', 'Kim Namjoon', 'pictureofme@pictures.com', 'thisismypassword123', 9195487521).then(data => {
//     console.log(data);
//     console.log("Registration successful!");
// }).catch(err => {
//     console.error(err);
// });

module.exports = {
    retrieveUserName, registerNewUser, retrieveUserEmail
}