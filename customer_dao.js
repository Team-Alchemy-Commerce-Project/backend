//Contains user-related functions handling user login and registration:
const AWS = require('aws-sdk');

AWS.config.update({
    region: 'us-east-2'
});

const docClient = new AWS.DynamoDB.DocumentClient();

//Function to retrieve Username from Customer Table in DB:
function retrieveUserName(username) {

    const params = {

        TableName: 'Customers',
        Key: {

            'username': username
        }

    }

    return docClient.get(params).promise();

}

function retrieveUserEmail(email){

    const params = {

        TableName: 'Customers',
        IndexName : 'email-index',
        KeyConditionExpression: '#c = :value',
        ExpressionAttributeNames: {'#c': 'email'},
        ExpressionAttributeValues: {':value': email} 
    }

    return docClient.query(params).promise();

}

//TEST RETRIEVEUSERNAME FUNCTION: WORKS!
// retrieveUserName('1').then(data => {
//     console.log(data.Item);
// })


//Function to register a new user account:
function registerNewUser(username, address, credit_card, email, full_name, image, password, phone) {

    const params = {

        TableName: "Customers",
        Item: {
            "username": username,
            "address": address,
            "credit_card": credit_card,
            "email": email,
            "full_name": full_name,
            "image": image,
            "password": password,
            "phone": phone,
            "role": "user"
        }
    }

    return docClient.put(params).promise();
}

// //Testing 'registerNewUser' function: 
// // registerNewUser('kimnamjoon', 'wildflower39').then(data => {
// //     console.log(data);
// //     console.log("Registration successful!");
// // }).catch(err => {
// //     console.error(err);
// // });


module.exports = {
    retrieveUserName, registerNewUser, retrieveUserEmail
}