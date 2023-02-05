const AWS = require('aws-sdk');

AWS.config.update({
    region: 'us-east-1'
});

const docClient = new AWS.DynamoDB.DocumentClient();

//RETRIEVE PRODUCTS IN CART
function retrieveItemsInCart(username) {
    return docClient.get({
        TableName: 'carts',
        Key: {
            "username": username
        }
    }).promise();
}

//ADD FIRST PRODUCT TO CART
function addFirstItemToCart(username, items) {
    return docClient.update({
        TableName: 'carts',
        Key: {
            "username": username
        },
        UpdateExpression: "set #i = :val",
        ExpressionAttributeNames: {
            "#i": "items"
        },
        ExpressionAttributeValues: {
            ":val": items
        }
    }).promise();
}

//ADD DUPLICATE PRODUCT TO CART
function addItemToCart(username, items) {
    return docClient.update({
        TableName: 'carts',
        Key: {
            "username": username
        },
        UpdateExpression: "set #i = :val",
        ExpressionAttributeNames: {
            "#i": "items"
        },
        ExpressionAttributeValues: {
            ":val": items
        }
    }).promise();
}

module.exports = {
    addFirstItemToCart,
    addItemToCart,
    retrieveItemsInCart
}