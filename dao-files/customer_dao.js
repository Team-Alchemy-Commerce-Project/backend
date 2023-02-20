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
function registerNewUser(username, street_address, city, state, zipcode1, email, full_name, profile_picture, password, phone_number) {

    const params = {

        TableName: "customers",
        Item: {
            "username": username,
            "address": {
                "street_address": street_address,
                "city": city,
                "state": state,
                "zipcode1": zipcode1
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

function updateUserProfile(username, password, email, street_address, city, state, zipcode1, expiration, last4digits, security_code, zipcode2, full_name, phone_number, profile_picture){
    const params = {
        TableName: "customers",
        Key: {
            username
        },
        UpdateExpression: 'set #n = :value1, #a = :value2, #add.#b = :value3, #add.#c = :value4, #add.#d = :value5, #add.#e = :value6, #cred.#f = :value7, #cred.#g = :value8, #cred.#h = :value9, #cred.#i = :value10, #j = :value11, #k = :value12, #l = :value13',
        ExpressionAttributeNames: {
            '#n': 'password',
            '#a': 'email',
            "#add": 'address',
            '#b': 'street_address',
            '#c': 'city',
            '#d': 'state',
            '#e': 'zipcode1',
            '#cred': 'credit_card_info',
            '#f': 'expiration',
            '#g': 'last4digits',
            '#h': 'security_code',
            '#i': 'zipcode2',
            '#j': 'full_name',
            '#k': 'phone_number',
            '#l': 'profile_picture',
        },
        ExpressionAttributeValues: {
            ':value1': password,
            ':value2': email,
            ':value3': street_address,
            ':value4': city,
            ':value5': state,
            ':value6': zipcode1,
            ':value7': expiration,
            ':value8': last4digits,
            ':value9': security_code,
            ':value10': zipcode2,
            ':value11': full_name,
            ':value12': phone_number,
            ':value13': profile_picture,
            
        }
    }

    return docClient.update(params).promise();
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

function updateCardNumberByUsername(username, card_number){
    const params = {
        TableName: "customers",
        Key: {
            username
        },
        UpdateExpression: 'set #n = :value',
        ExpressionAttributeNames: {
            '#n': 'card_number'
        },
        ExpressionAttributeValues: {
            ':value': card_number
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
    updateCardNumberByUsername,
    updateSecurityCodeByUsername,
    updatePhoneNumberByUsername,
    updateProfilePictureByUsername,
    updateUserProfile,
}