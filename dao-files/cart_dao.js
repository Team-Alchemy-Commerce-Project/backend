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

//ADD OR REMOVE CART ITEM
function updateCart(username, items) {
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

//DELETE USER'S CART AT TIME OF PURCHASE
function deleteCartByUsername(username) {
    return docClient.delete({
        TableName: 'carts',
        Key: {
            username
        }
    }).promise();
}

//CREATE EMPTY CART FOR USER
function addCart(username, items) {
    return docClient.put({
        TableName: 'carts',
        Item: {
            "items": items,
            "username": username
        }
    }).promise();
}

module.exports = {
    retrieveItemsInCart,
    updateCart,
    deleteCartByUsername,
    addCart
}