
//Contains product-related functions handling creation and retrieval of products:

const AWS = require('aws-sdk');
const uuid = require ('uuid');

AWS.config.update({
    region: 'us-east-1'
});

const docClient = new AWS.DynamoDB.DocumentClient();


//ADD NEW PRODUCT TO SITE
function addNewProduct(product_number, description, image, inventory_count, product_name, price) {
    return docClient.put({
        TableName: "products",
        Item: {
            "product_number": product_number,
            "description": description,
            "image": image,
            "inventory_count": inventory_count,
            "product_name": product_name,
            "price": price
        }
    }).promise();
}

// TEST ADDNEWPRODUCT FUNCTION: WORKS!
// addNewProduct(uuid.v4(), 'a brilliant 50-watt light bulb', 'lightbulbpic@lightbulb.com', true, 6, 'light bulb', 5).then(data => {
//     console.log(data);
//     console.log("New product added successfully");

//VIEW ALL PRODUCTS
function viewAllProducts() {
    const params = {
        TableName: 'products'
    }
    return docClient.scan(params).promise();
}

//TEST VIEWALLPRODUCTS FUNCTION: WORKS!
// viewAllProducts().then(data => {
//     console.log(data);
//     console.log("Products gathered successfully");
// }).catch(err => {
//     console.error(err);
// });

//RETRIEVE PRODUCT BY PRODUCT NUMBER
function retrieveProductByNumber(product_number) {
    return docClient.get({
        TableName: 'products',
        Key: {
            'product_number': product_number
        }
    }).promise();
}

//TEST RETRIEVEPRODUCTBYNUMBER FUNCTION: WORKS!
// retrieveProductByNumber("2").then(data => {
//     console.log(data);
//     console.log("Product gathered successfully");
// }).catch(err => {
//     console.error(err);
// });


//UPDATE PRODUCT DESCRIPTION BY PRODUCT NUMBER
function updateProductsByNumber(ProductNumber, newDescription) {
    return docClient.update({
        TableName: "products",
        Key: {
            "product_number": ProductNumber
        },
        UpdateExpression: 'set #a = :value',
        ExpressionAttributeNames: {
            '#a': 'description'
        },
        ExpressionAttributeValues: {
            ':value': newDescription
        }
    }).promise();
};

//TEST UPDATEPRODUCTDESCRIPTIONBYPRODUCTNUMBER: WORKS!
// updateProductDescriptionByProductNumber('2', 'this is an updated description for this product').then(data => {
//     console.log(data)
//     console.log("Product updated successfully");
// }).catch(err => {
//     console.error(err);
// });

module.exports = {
    addNewProduct,
    viewAllProducts,
    retrieveProductByNumber,
    updateProductsByNumber,
};