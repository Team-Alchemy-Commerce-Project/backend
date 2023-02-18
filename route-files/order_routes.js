const express = require('express');
const router = express.Router();
const jwt = require('../utility/jwts');

const cartDao = require('../dao-files/cart_dao');
const customerDao = require('../dao-files/customer_dao');
const orderDao = require('../dao-files/order_dao');
const uuid = require('uuid');
const timestamp = require('unix-timestamp');
timestamp.round = true;

//PURCHASE ITEMS IN CART
router.post('/orders', async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1]; 
        const payload = await jwt.verifyToken(token);
        try {
            const data = await customerDao.retrieveUserName(payload.username);
            if (data.Item.full_name == req.body.full_name && 
                data.Item.address.street_address == req.body.street_address && 
                data.Item.address.city == req.body.city && 
                data.Item.address.state == req.body.state && 
                data.Item.address.zipcode1 == req.body.zipcode1                                         
                ) {
                const cartData = await cartDao.retrieveItemsInCart(payload.username);
                try {
                    await customerDao.addCreditCardInfo(payload.username, {"card_number": req.body.card_number, "expiration": req.body.expiration, "security_code": req.body.security_code, "zipcode2": req.body.zipcode2});
                    await orderDao.addOrderToOrders(uuid.v4(), cartData.Item.items, Number(timestamp.now()), payload.username);
                    await cartDao.deleteCartByUsername(payload.username);
                    res.statusCode = 201; 
                    res.send({
                        "message": "Successfully added purchase to order history."
                    });
                } catch (err) {
                    res.statusCode = 500;
                    res.send({
                        "message": err
                    });  
                }
            } else {
                res.statusCode = 401;
                res.send({
                    "message": "You don't have valid credit card info on file with us."
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

//VIEW PREVIOUS ORDERS
router.get('/orders/:username', async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1]; 
        const payload = await jwt.verifyToken(token);
        
        let data = await orderDao.retrieveOrdersByUsername(payload.username)

            if (data === undefined) {
                res.statusCode = 400;
                res.send({
                    "message": "No orders for this user"
                })

            } else {
                
                res.statusCode = 201;
                res.send(data.Items);

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
                "message": "no JWT",
            })
        }
    }
});


module.exports = router;