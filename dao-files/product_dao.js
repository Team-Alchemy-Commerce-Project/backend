//Contains product-related functions handling creation and retrieval of products:

const AWS = require('aws-sdk');
const uuid = require ('uuid');

AWS.config.update({
    region: 'us-east-1'
});

const docClient = new AWS.DynamoDB.DocumentClient();

//Function to add new product to database for display/sale on the site: (Stretch goal)
function addNewProduct(ProductNumber, Description, Image, InStock, InventoryCount, Name, Price) {
    return docClient.put({
        TableName: "Products",
        Item: {
            "ProductNumber": ProductNumber,
            "Description": Description,
            "Image": Image,
            "InStock": InStock,
            "InventoryCount": InventoryCount,
            "Name": Name,
            "Price": Price
        }
    }).promise();
}

// Testing addNewProduct function: WORKS!
// addNewProduct(uuid.v4(), 'a brilliant 50-watt light bulb', 'lightbulbpic@lightbulb.com', true, 6, 'light bulb', 5).then(data => {
//     console.log(data);
//     console.log("New product added successfully");
// }).catch(err => {
//     console.error(err);
// });


// //Function to retrieve all products for viewing on the site:
function viewAllProducts() {
    const params = {
        TableName: 'Products'
    }
    return docClient.scan(params).promise();
}

// Testing viewAllProducts function: WORKS!
// viewAllProducts().then(data => {
//     console.log(data);
//     console.log("Products gathered successfully");
// }).catch(err => {
//     console.error(err);
// });

//*****************************************
//Function to retrieve products by product#:
function retrieveProductByProductNumber(ProductNumber) {
    const params = {
        TableName: "Products",
        Key: {
            "ProductNumber": ProductNumber
        }
    }
    return docClient.get(params).promise();
}

//Testing retrieveTicketByTicketID function: WORKS!
// retrieveProductByProductNumber('2').then(data => {
//     console.log(data);
//     console.log("Product gathered successfully");
// }).catch(err => {
//     console.error(err);
// });


//Function to update Products by product#:
function updateProductDescriptionByProductNumber(ProductNumber, newDescription) {
    return docClient.update({
        TableName: "Products",
        Key: {
            "ProductNumber": ProductNumber
        },
        UpdateExpression: 'set #a = :value',
        ExpressionAttributeNames: {
            '#a': 'Description'
        },
        ExpressionAttributeValues: {
            ':value': newDescription
        }
    }).promise();
};

//Testing updateProductDescriptionByProductNumber function: WORKS!
// updateProductDescriptionByProductNumber('2', 'this is an updated description for this product').then(data => {
//     console.log(data)
//     console.log("Product updated successfully");
// }).catch(err => {
//     console.error(err);
// });


function updateProductImageByProductNumber(ProductNumber, newImage) {
    return docClient.update({
        TableName: "Products",
        Key: {
            "ProductNumber": ProductNumber
        },
        UpdateExpression: 'set #b = :value',
        ExpressionAttributeNames: {
            '#b': 'Image'
        },
        ExpressionAttributeValues: {
            ':value': newImage
        }
    }).promise();
};

//Testing updateProductImageByTicketID function: WORKS!
// updateProductDescriptionByProductNumber('2', 'this is an updated description for this product').then(data => {
//     console.log(data)
//     console.log("Product updated successfully");
// }).catch(err => {
//     console.error(err);
// });










// //Function for employees to retrieve their tickets by their username
// function retrieveTicketsByUsername(username) {
//     return docClient.query({
//         TableName: "Tickets",
//         IndexName: "username-index",
//         KeyConditionExpression: "#s = :value",
//         ExpressionAttributeNames: {
//             "#s": "username"
//         },
//         ExpressionAttributeValues: {
//             ":value": username
//         }
//     }).promise();
// }

// //Testing retrieveTicketsByUsername function: 
// // retrieveTicketsByUsername('parkjimin').then(data => {
// //     const employeeTicketsQueue = [];
// //     employeeTicketsQueue.push(data);
// //     console.log(employeeTicketsQueue);
// //     console.log("Tickets gathered successfully");
// // }).catch(err => {
// //     console.error(err);
// // });
    


module.exports = {
    addNewProduct,
    viewAllProducts,
    retrieveProductByProductNumber,
    updateProductDescriptionByProductNumber
};