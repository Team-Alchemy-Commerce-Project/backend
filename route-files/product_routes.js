//Handles HTTP endpoints product-related requests:

const express = require('express');
const router = express.Router();

const jwt = require('../utility/jwts');
const uuid = require ('uuid');

const productDao = require('../dao-files/product_dao');

//ADMIN ADD/UPDATE PRODUCTS
router.post('/products', async (req, res) => {
    try {
        if (req.body.product_number) {
            let productDetails = await productDao.retrieveProductByNumber(req.body.product_number);
            await productDao.addNewProduct(req.body.product_number, req.body.description || productDetails.Item.description, req.body.image || productDetails.Item.image,
                req.body.inventory_count || productDetails.Item.inventory_count, req.body.product_name || productDetails.Item.product_name, req.body.price || productDetails.Item.price);
                return res.send({
                    "message": "Existing product details successfully updated!"
                })
        } else {
            await productDao.addNewProduct(uuid.v4(), req.body.description, req.body.image, req.body.inventory_count, req.body.product_name, req.body.price);
                return res.send({
                    "message": "New product successfully added to shop!"
                })
        }
    } catch(err) {
        if (err.name === 'JsonWebTokenError') {
            res.statusCode = 400;
            return res.send({
                "message": "Invalid JsonWebToken."
        })
        } else if (err.name === 'TypeError') {
            res.statusCode = 400;
            return res.send({
                "message": "No Authorization header provided."
            });
        } else {
            res.statusCode = 500;
            //server error
            return res.send({
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
                return res.send(viewProducts);
            } else {
                return res.send('The store is empty now. New items coming soon!')
            }
        }  catch(err) {
                if (err.name === 'TypeError') {
                    res.statusCode = 400;
                    return res.send({
                        "message": "No Authorization header provided."
                });
                } else {
                    res.statusCode = 500;
                    //server error
                    return res.send({
                        "message": "Something went wrong. Please reload the page and try again. :/"
                });
        }
    }
});

//ADMIN UPDATE PRODUCTS BY PRODUCT ATTRIBUTES
router.patch('/products', async (req, res) => {
    try {
        // const token = req.headers.authorization.split(" ")[1];
        // const tokenPayload = await jwt.verifyToken(token);
        const data = await productDao.retrieveProductByNumber(req.body.product_number);

        // if (tokenPayload.role === 'admin') {
            if (productItem) {
                productDao.updateProductByNumber(req.body.product_number, req.body.description);
                return res.send({
                    "message": "Product description updated successfully!"
                })
            } else {
                return res.send({
                    "message": "There are no products with this product number."
                })
            }
    } catch(err) {
        if (err.name === 'JsonWebTokenError') {
            res.statusCode = 400;
            return res.send({
                "message": "Invalid JsonWebToken."
            })
        } else if (err.name === 'TypeError') {
            res.statusCode = 400;
            return res.send({
                "message": "No Authorization header provided."
            });
        } else {
            res.statusCode = 500;
            //server error
            return res.send({
                "message": "Something went wrong. Please reload the page and try again. :/"
            });
        };
    }
});

//GET PRODUCT BY NUMBER
router.get('/products/:product_number', async (req, res) => {
    try {
        let productDetails = await productDao.retrieveProductByNumber(req.params.product_number);
        res.statusCode = 200;
        return res.send(productDetails.Item);          
    } catch(err) {
        return res.send(err)
    }
});

module.exports = router;