const express = require('express');
const router = express.Router();
const jwt = require('../utility/jwts');

const cartDao = require('../dao-files/cart_dao');
const productDao = require('../dao-files/product_dao');

//ADD TO CART
router.post('/cart', async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1]; 
        const payload = await jwt.verifyToken(token);
        try {
            const data = await productDao.retrieveProductByID(req.body.product_id);
            if (data.Item) {
                try {
                    const cartData = await cartDao.retrieveItemsInCart(payload.username);
                    if (typeof cartData.Item !== 'undefined') {
                        if (cartData.Item.items.find(item => item.product_id === req.body.product_id)) {
                            try {
                                const x = cartData.Item.items.map(e => e.product_id).indexOf(req.body.product_id);
                                let newQuantity = (cartData.Item.items[x].quantity) + 1;
                                const existingItemsPlusDupe = cartData.Item.items;
                                existingItemsPlusDupe.splice(x, 1);
                                existingItemsPlusDupe.push( { 'product_id': req.body.product_id, 'quantity': newQuantity})
                                await cartDao.addItemToCart(payload.username, existingItemsPlusDupe);
                                res.statusCode = 201; 
                                res.send({
                                    "message": `Successfully updated the quantity of ${req.body.product_id} in your cart.`
                                });
                            } catch (err) {
                                res.statusCode = 500;
                                res.send({
                                    "message": err
                                });  
                            }                                           
                        } else {
                            try {
                                const existingItemsPlusNew = cartData.Item.items;
                                existingItemsPlusNew.push( { 'product_id': req.body.product_id, 'quantity': 1} );
                                await cartDao.addItemToCart(payload.username, existingItemsPlusNew);
                                res.statusCode = 201; 
                                res.send({
                                    "message": "Successfully added this item to your cart."
                                });
                            } catch (err) {
                                res.statusCode = 500;
                                res.send({
                                    "message": err
                                });  
                            }  
                        }                           
                    } else {
                        try {
                            const newItems = [];
                            newItems.push( { 'product_id': req.body.product_id, 'quantity': 1} );
                            await cartDao.addFirstItemToCart(payload.username, newItems);
                            res.statusCode = 201; 
                            res.send({
                                "message": "Successfully created your cart and added this item."
                            });
                        } catch (err) {
                            res.statusCode = 500;
                            res.send({
                                "message": err
                            });  
                        }                              
                    }              
                } catch (err) {
                    res.statusCode = 500;
                    res.send({
                        "message": err
                    });  
                }
            } else {
                res.statusCode = 401;
                res.send({
                    "message": `Product with ID ${req.body.product_id} doesn't exist.`
                })
            }
        } catch(err) {
            res.statusCode = 500;
            res.send({
                "message": err
            });
        }
    } catch(err) {
        if (err.name === 'JsonWebTokenError') {
            res.statusCode = 400;
            res.send({
                "message": "Invalid JWT"
            })
        } else if (err) {
            res.statusCode = 500;
            res.send({
                "message": "no JWT"
            });
        }
    }
});

//VIEW CART
router.get('/cart', async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1]; 
        const payload = await jwt.verifyToken(token);
        try {
            const cartData = await cartDao.retrieveItemsInCart(payload.username);
            if (typeof cartData.Item !== 'undefined') {
                res.statusCode = 200;
                res.send(cartData.Item.items);
            } else {
                res.statusCode = 401;
                res.send({
                    "message": "Your cart is empty."
                });  
            }                  
        } catch(err) {
            res.statusCode = 500;
            res.send({
                "message": err
            });
        }
    } catch(err) {
        if (err.name === 'JsonWebTokenError') {
            res.statusCode = 400;
            res.send({
                "message": "Invalid JWT"
            })
        } else if (err) {
            res.statusCode = 500;
            res.send({
                "message": "no JWT"
            });
        }
    }
});

module.exports = router;