//Handles HTTP endpoints product-related requests:

const express = require('express');
const router = express.Router();

const jwt = require('../utility/jwts');
const uuid = require ('uuid');

const productDao = require('../dao-files/product_dao');

//ADMIN ADD NEW PRODUCTS TO STORE
router.post('/products', async (req, res) => {
    try {
//         const authorizationHeader = req.headers.authorization;
// //Gets the token from the authorization header to check for role: admin
//         const token = authorizationHeader.split(" ")[1];
//         const tokenPayload = await jwt.verifyToken(token);

        // if (tokenPayload.role === 'admin') {
            await productDao.addNewProduct(uuid.v4(), req.body.description, req.body.image, req.body.inventory_count, req.body.product_name, req.body.price);
                res.send({
                    "message": "New product successfully added to shop!"
                })
        } catch(err) {
            if (err.name === 'JsonWebTokenError') {
                res.statusCode = 400;
                res.send({
                    "message": "Invalid JsonWebToken."
            })
        } else if (err.name === 'TypeError') {
            res.statusCode = 400;
            res.send({
                "message": "No Authorization header provided."
            });
        } else {
            res.statusCode = 500;
            //server error
            res.send({
                "message": "Something went wrong. Please reload the page and try again. :/"
            });
        }
    }
});

//VIEW ALL PRODUCTS
router.get('/products', async (req, res) => {
    try {
            let viewProducts = await productDao.viewAllProducts();
            if (viewProducts.Items.length > 0) {
                res.send(viewProducts);
            } else {
                res.send('The store is empty now. New items coming soon!')
            }
        }  catch(err) {
                if (err.name === 'TypeError') {
                    res.statusCode = 400;
                    res.send({
                        "message": "No Authorization header provided."
                });
                } else {
                    res.statusCode = 500;
                    //server error
                    res.send({
                        "message": "Something went wrong. Please reload the page and try again. :/"
                });
        }
    }
});

//ADMIN UPDATE PRODUCT DESCRIPTION BY PRODUCT NUMBER
router.patch('/products/:id/description', async (req, res) => {
    try {
        // const token = req.headers.authorization.split(" ")[1];
        // const tokenPayload = await jwt.verifyToken(token);

        const productNumber = req.body.product_number;
        const data = await productDao.retrieveProductByProductNumber(productNumber);
        const productItem = data.Item;

        // if (tokenPayload.role === 'admin') {
            if (productItem) {
                productDao.updateProductDescriptionByProductNumber(req.body.product_number, req.body.description);
                res.send({
                    "message": "Product description updated successfully!"
                })
            } else {
                res.send({
                    "message": "There are no products with this product number."
                })
            }
    } catch(err) {
        if (err.name === 'JsonWebTokenError') {
            res.statusCode = 400;
            res.send({
                "message": "Invalid JsonWebToken."
            })
        } else if (err.name === 'TypeError') {
            res.statusCode = 400;
            res.send({
                "message": "No Authorization header provided."
            });
        } else {
            res.statusCode = 500;
            //server error
            res.send({
                "message": "Something went wrong. Please reload the page and try again. :/"
            });
        };
    }
});


//ADMIN UPDATE PRODUCT IMAGE BY PRODUCT NUMBER
router.patch('/products/:id/image', async (req, res) => {
    try {
        // const token = req.headers.authorization.split(" ")[1];
        // const tokenPayload = await jwt.verifyToken(token);

        const productNumber = req.body.product_number;
        const data = await productDao.retrieveProductByProductNumber(productNumber);
        const productItem = data.Item;

        // if (tokenPayload.role === 'admin') {
            if (productItem) {
                productDao.updateProductImageByProductNumber(req.body.product_number, req.body.image);
                res.send({
                    "message": "Product image updated successfully!"
                })
            } else {
                res.send({
                    "message": "There are no products with this product number."
                })
            }
    } catch(err) {
        if (err.name === 'JsonWebTokenError') {
            res.statusCode = 400;
            res.send({
                "message": "Invalid JsonWebToken."
            })
        } else if (err.name === 'TypeError') {
            res.statusCode = 400;
            res.send({
                "message": "No Authorization header provided."
            });
        } else {
            res.statusCode = 500;
            //server error
            res.send({
                "message": "Something went wrong. Please reload the page and try again. :/"
            });
        };
    }
});

//ADMIN UPDATE PRODUCT INVENTORY COUNT BY PRODUCT NUMBER
router.patch('/products/:id/inventory', async (req, res) => {
    try {
        // const token = req.headers.authorization.split(" ")[1];
        // const tokenPayload = await jwt.verifyToken(token);

        const productNumber = req.body.product_number;
        const data = await productDao.retrieveProductByProductNumber(productNumber);
        const productItem = data.Item;

        // if (tokenPayload.role === 'admin') {
            if (productItem) {
                productDao.updateProductInventoryCountByProductNumber(req.body.product_number, req.body.inventory_count);
                res.send({
                    "message": "Product inventory count updated successfully!"
                })
            } else {
                res.send({
                    "message": "There are no products with this product number."
                })
            }
    } catch(err) {
        if (err.name === 'JsonWebTokenError') {
            res.statusCode = 400;
            res.send({
                "message": "Invalid JsonWebToken."
            })
        } else if (err.name === 'TypeError') {
            res.statusCode = 400;
            res.send({
                "message": "No Authorization header provided."
            });
        } else {
            res.statusCode = 500;
            //server error
            res.send({
                "message": "Something went wrong. Please reload the page and try again. :/"
            });
        };
    }
});


//ADMIN UPDATE PRODUCT NAME BY PRODUCT NUMBER
router.patch('/products/:id/name', async (req, res) => {
    try {
        // const token = req.headers.authorization.split(" ")[1];
        // const tokenPayload = await jwt.verifyToken(token);

        const productNumber = req.body.product_number;
        const data = await productDao.retrieveProductByProductNumber(productNumber);
        const productItem = data.Item;

        // if (tokenPayload.role === 'admin') {
            if (productItem) {
                productDao.updateProductNameByProductNumber(req.body.product_number, req.body.product_name);
                res.send({
                    "message": "Product name updated successfully!"
                })
            } else {
                res.send({
                    "message": "There are no products with this product number."
                })
            }
    } catch(err) {
        if (err.name === 'JsonWebTokenError') {
            res.statusCode = 400;
            res.send({
                "message": "Invalid JsonWebToken."
            })
        } else if (err.name === 'TypeError') {
            res.statusCode = 400;
            res.send({
                "message": "No Authorization header provided."
            });
        } else {
            res.statusCode = 500;
            //server error
            res.send({
                "message": "Something went wrong. Please reload the page and try again. :/"
            });
        };
    }
});


//ADMIN UPDATE PRODUCT PRICE BY PRODUCT NUMBER
router.patch('/products/:id/price', async (req, res) => {
    try {
        // const token = req.headers.authorization.split(" ")[1];
        // const tokenPayload = await jwt.verifyToken(token);

        const productNumber = req.body.product_number;
        const data = await productDao.retrieveProductByProductNumber(productNumber);
        const productItem = data.Item;

        // if (tokenPayload.role === 'admin') {
            if (productItem) {
                productDao.updateProductPriceByProductNumber(req.body.product_number, req.body.price);
                res.send({
                    "message": "Product price updated successfully!"
                })
            } else {
                res.send({
                    "message": "There are no products with this product number."
                })
            }
    } catch(err) {
        if (err.name === 'JsonWebTokenError') {
            res.statusCode = 400;
            res.send({
                "message": "Invalid JsonWebToken."
            })
        } else if (err.name === 'TypeError') {
            res.statusCode = 400;
            res.send({
                "message": "No Authorization header provided."
            });
        } else {
            res.statusCode = 500;
            //server error
            res.send({
                "message": "Something went wrong. Please reload the page and try again. :/"
            });
        };
    }
});

module.exports = router;