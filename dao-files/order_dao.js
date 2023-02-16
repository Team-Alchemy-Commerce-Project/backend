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

module.exports = {
    addOrderToOrders
}