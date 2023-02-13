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

function updatePasswordByUsername(username, password){
    const params = {
        TableName: "customers",
        Key: {
            username
        },
        UpdateExpression: 'set #n = :value',
        ExpressionAttributeNames: {
            '#n': 'password'
        },
        ExpressionAttributeValues: {
            ':value': password
        }
    }

    return docClient.update(params).promise();
}

function updateNameByUsername(username, full_name){
    const params = {
        TableName: "customers",
        Key: {
            username
        },
        UpdateExpression: 'set #n = :value',
        ExpressionAttributeNames: {
            '#n': 'full_name'
        },
        ExpressionAttributeValues: {
            ':value': full_name
        }
    }

    return docClient.update(params).promise();
}

function updateCityByUsername(username, city){
    const params = {
        TableName: "customers",
        Key: {
            username
        },
        UpdateExpression: 'set #n = :value',
        ExpressionAttributeNames: {
            '#n': 'city'
        },
        ExpressionAttributeValues: {
            ':value': city
        }
    }

    return docClient.update(params).promise();
}

function updateStateByUsername(username, state){
    const params = {
        TableName: "customers",
        Key: {
            username
        },
        UpdateExpression: 'set #n = :value',
        ExpressionAttributeNames: {
            '#n': 'state'
        },
        ExpressionAttributeValues: {
            ':value': state
        }
    }

    return docClient.update(params).promise();
}

function updateStreetAddressByUsername(username, street_address){
    const params = {
        TableName: "customers",
        Key: {
            username
        },
        UpdateExpression: 'set #n = :value',
        ExpressionAttributeNames: {
            '#n': 'street_address'
        },
        ExpressionAttributeValues: {
            ':value': street_address
        }
    }

    return docClient.update(params).promise();
}

function updateZipCodeByUsername(username, zipcode){
    const params = {
        TableName: "customers",
        Key: {
            username
        },
        UpdateExpression: 'set #n = :value',
        ExpressionAttributeNames: {
            '#n': 'zipcode'
        },
        ExpressionAttributeValues: {
            ':value': zipcode
        }
    }

    return docClient.update(params).promise();
}

function updateExpirationByUsername(username, expiration){
    const params = {
        TableName: "customers",
        Key: {
            username
        },
        UpdateExpression: 'set #n = :value',
        ExpressionAttributeNames: {
            '#n': 'expiration'
        },
        ExpressionAttributeValues: {
            ':value': expiration
        }
    }

    return docClient.update(params).promise();
}

function updateLast4DigitsByUsername(username, last4digits){
    const params = {
        TableName: "customers",
        Key: {
            username
        },
        UpdateExpression: 'set #n = :value',
        ExpressionAttributeNames: {
            '#n': 'last4digits'
        },
        ExpressionAttributeValues: {
            ':value': last4digits
        }
    }

    return docClient.update(params).promise();
}

function updateSecurityCodeByUsername(username, security_code){
    const params = {
        TableName: "customers",
        Key: {
            username
        },
        UpdateExpression: 'set #n = :value',
        ExpressionAttributeNames: {
            '#n': 'security_code'
        },
        ExpressionAttributeValues: {
            ':value': security_code
        }
    }

    return docClient.update(params).promise();
}

function updateEmailByUsername(username, email){
    const params = {
        TableName: "customers",
        Key: {
            username
        },
        UpdateExpression: 'set #n = :value',
        ExpressionAttributeNames: {
            '#n': 'email'
        },
        ExpressionAttributeValues: {
            ':value': email
        }
    }

    return docClient.update(params).promise();
}

function updatePhoneNumberByUsername(username, phone_number){
    const params = {
        TableName: "customers",
        Key: {
            username
        },
        UpdateExpression: 'set #n = :value',
        ExpressionAttributeNames: {
            '#n': 'phone_number'
        },
        ExpressionAttributeValues: {
            ':value': phone_number
        }
    }

    return docClient.update(params).promise();
}

function updateProfilePictureByUsername(username, profile_picture){
    const params = {
        TableName: "customers",
        Key: {
            username
        },
        UpdateExpression: 'set #n = :value',
        ExpressionAttributeNames: {
            '#n': 'profile_picture'
        },
        ExpressionAttributeValues: {
            ':value': profile_picture
        }
    }

    return docClient.update(params).promise();
}

module.exports = {
    retrieveUserName, 
    registerNewUser, 
    retrieveUserEmail, 
    updatePasswordByUsername,
    updateNameByUsername,
    updateCityByUsername,
    updateEmailByUsername,
    updateStateByUsername,
    updateStreetAddressByUsername,
    updateZipCodeByUsername,
    updateExpirationByUsername,
    updateLast4DigitsByUsername,
    updateSecurityCodeByUsername,
    updatePhoneNumberByUsername,
    updateProfilePictureByUsername
}