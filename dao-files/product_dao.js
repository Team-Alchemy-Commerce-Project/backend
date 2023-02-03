
//Contains product-related functions handling creation and retrieval of products:

const AWS = require('aws-sdk');
const uuid = require ('uuid');

AWS.config.update({
    region: 'us-east-1'
});

const docClient = new AWS.DynamoDB.DocumentClient();


//ADD NEW PRODUCT TO SITE
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

// TEST ADDNEWPRODUCT FUNCTION: WORKS!
// addNewProduct(uuid.v4(), 'a brilliant 50-watt light bulb', 'lightbulbpic@lightbulb.com', true, 6, 'light bulb', 5).then(data => {
//     console.log(data);
//     console.log("New product added successfully");


//ADD PRODUCT TO CART
function addItemToCart(cartID, productID, randomUserID) {
    return docClient.put({
        TableName: 'carts',
        Item: {
            "cartID": cartID,
            "productID": productID,
            "randomUserID": randomUserID,
        }
    }).promise();
}


//RETRIEVE PRODUCT ID TO ADD TO CARTS TABLE
function retrieveProductByID(productID) {
    return docClient.get({
        TableName: 'products',
        Key: {
            "productID": productID
        }
    }).promise();
}


//VIEW ALL PRODUCTS
function viewAllProducts() {
    const params = {
        TableName: 'Products'
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
function retrieveProductByProductNumber(ProductNumber) {
    const params = {
        TableName: "Products",
        Key: {
            "ProductNumber": ProductNumber
        }
    }
    return docClient.get(params).promise();
}

//TEST RETRIEVEPRODUCTBYPRODUCTNUMBER FUNCTION: WORKS!
// retrieveProductByProductNumber("2").then(data => {
//     console.log(data);
//     console.log("Product gathered successfully");
// }).catch(err => {
//     console.error(err);
// });


//UPDATE PRODUCT DESCRIPTION BY PRODUCT NUMBER
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

//TEST UPDATEPRODUCTDESCRIPTIONBYPRODUCTNUMBER: WORKS!
// updateProductDescriptionByProductNumber('2', 'this is an updated description for this product').then(data => {
//     console.log(data)
//     console.log("Product updated successfully");
// }).catch(err => {
//     console.error(err);
// });


//UPDATE PRODUCT IMAGE BY PRODUCT NUMBER
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

//TEST UPDATEPRODUCTIMAGEBYPRODUCTNUMBER: WORKS!
// updateProductImageByProductNumber('2', 'updatedemail@email.com').then(data => {
//     console.log(data)
//     console.log("Product updated successfully");
// }).catch(err => {
//     console.error(err);
// });


function updateProductInStockByProductNumber(ProductNumber, newStockStatus) {
    return docClient.update({
        TableName: "Products",
        Key: {
            "ProductNumber": ProductNumber
        },
        UpdateExpression: 'set #c = :value',
        ExpressionAttributeNames: {
            '#c': 'InStock'
        },
        ExpressionAttributeValues: {
            ':value': newStockStatus
        }
    }).promise();
};

//TEST UPDATEPRODUCTINSTOCKBYPRODUCTNUMBER: WORKS!
// updateProductInStockByProductNumber('2', false).then(data => {
//     console.log(data)
//     console.log("Product updated successfully");
// }).catch(err => {
//     console.error(err);
// });


function updateProductInventoryCountByProductNumber(ProductNumber, newInventoryCount) {
    return docClient.update({
        TableName: "Products",
        Key: {
            "ProductNumber": ProductNumber
        },
        UpdateExpression: 'set #d = :value',
        ExpressionAttributeNames: {
            '#d': 'InventoryCount'
        },
        ExpressionAttributeValues: {
            ':value': newInventoryCount
        }
    }).promise();
};

//TEST UPDATEPRODUCTINVENTORYCOUNTBYPRODUCTNUMBER: WORKS!
// updateProductInventoryCountByProductNumber('2', 1).then(data => {
//     console.log(data)
//     console.log("Product updated successfully");
// }).catch(err => {
//     console.error(err);
// });


function updateProductNameByProductNumber(ProductNumber, newName) {
    return docClient.update({
        TableName: "Products",
        Key: {
            "ProductNumber": ProductNumber
        },
        UpdateExpression: 'set #e = :value',
        ExpressionAttributeNames: {
            '#e': 'Name'
        },
        ExpressionAttributeValues: {
            ':value': newName
        }
    }).promise();
};

//TEST UPDATEPRODUCTNAMEBYPRODUCTNUMBER: WORKS!
// updateProductNameByProductNumber('2', 'Mousetrap').then(data => {
//     console.log(data)
//     console.log("Product updated successfully");
// }).catch(err => {
//     console.error(err);
// });

function updateProductPriceByProductNumber(ProductNumber, newPrice) {
    return docClient.update({
        TableName: "Products",
        Key: {
            "ProductNumber": ProductNumber
        },
        UpdateExpression: 'set #f = :value',
        ExpressionAttributeNames: {
            '#f': 'Price'
        },
        ExpressionAttributeValues: {
            ':value': newPrice
        }
    }).promise();
};

//TEST UPDATEPRODUCTPRICEBYPRODUCTNUMBER: WORKS!
// updateProductPriceByProductNumber('2', 5.99).then(data => {
//     console.log(data)
//     console.log("Product updated successfully");
// }).catch(err => {
//     console.error(err);
// });



module.exports = {

    addNewProduct,
    addItemToCart,
    retrieveProductByID,
    viewAllProducts,
    retrieveProductByProductNumber,
    updateProductDescriptionByProductNumber,
    updateProductImageByProductNumber,
    updateProductInStockByProductNumber,
    updateProductInventoryCountByProductNumber,
    updateProductNameByProductNumber,
    updateProductPriceByProductNumber
};