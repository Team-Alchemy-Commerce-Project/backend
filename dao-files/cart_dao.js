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

//ADD TO CART
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
    retrieveItemsInCart,
    addItemToCart,
}