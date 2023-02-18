const AWS = require('aws-sdk');

AWS.config.update({
    region: 'us-east-1'
});

const docClient = new AWS.DynamoDB.DocumentClient();

//ADD CUSTOMER'S PURCHASE TO ORDERS TABLE
function addOrderToOrders(order_id, items, timestamp, username) {
    return docClient.put({
        TableName: 'orders',
        Item: {
            "order_id": order_id,
            "items": items,
            "timestamp": timestamp,
            "username": username
        }
    }).promise();
}

function retrieveOrdersByUsername(username) {
    const params = {
        TableName: 'orders',
        IndexName: 'username-index',
        KeyConditionExpression: '#s = :value',
        ExpressionAttributeNames: {
            '#s': 'username'            
        },
        ExpressionAttributeValues: {
            ':value': username
        }
    }
    return docClient.query(params).promise();
}

module.exports = {
    addOrderToOrders,
    retrieveOrdersByUsername
}