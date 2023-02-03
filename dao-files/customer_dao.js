//Contains user-related functions handling user login and registration:
const AWS = require('aws-sdk');

AWS.config.update({
    region: 'us-east-1'
});

const docClient = new AWS.DynamoDB.DocumentClient();


//RETRIEVE USER NAME
function retrieveUserName(Username) {
    return docClient.get({
        TableName: "Customers",
        Key: {
            "Username": Username
        }
    }).promise();
}

//TEST RETRIEVEUSERNAME FUNCTION: WORKS!
// retrieveUserName('1').then(data => {
//     console.log(data.Item);
// })


// //Function to register a new user account:
// function registerNewUser(username, password) {
//     return docClient.put({
//         TableName: "Customers",
//         Item: {
//             "username": username,
//             "password": password,
//             "role": "employee"
//         }
//     }).promise();
// }

// //Testing 'registerNewUser' function: 
// // registerNewUser('kimnamjoon', 'wildflower39').then(data => {
// //     console.log(data);
// //     console.log("Registration successful!");
// // }).catch(err => {
// //     console.error(err);
// // });


module.exports = {
    retrieveUserName,
}