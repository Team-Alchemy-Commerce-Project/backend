const express = require('express');
const router = express.Router();
const jwt = require('../utility/jwts');

const cartDao = require('../dao-files/cart_dao');
const productDao = require('../dao-files/product_dao');

//ADD TO CART
router.post('/cart', async (req, res) => {
    const token = req.headers.authorization.split(' ')[1]; 
    const payload = await jwt.verifyToken(token);
    const data = await productDao.retrieveProductByNumber(req.body.product_number);
    const cartData = await cartDao.retrieveItemsInCart(payload.username);
    try {
        if (cartData.Item.items.find(item => item.product_number === req.body.product_number)) {
            const x = cartData.Item.items.map(e => e.product_number).indexOf(req.body.product_number);
            let newQuantity = (cartData.Item.items[x].quantity) + 1;
            const existingItemsPlusDupe = cartData.Item.items;
            existingItemsPlusDupe.splice(x, 1);
            existingItemsPlusDupe.push( { 'product_number': req.body.product_number, 'quantity': newQuantity, 'price': data.Item.price, 'product_name': data.Item.product_name })
            await cartDao.updateCart(payload.username, existingItemsPlusDupe);
            let newInventory_Count = (data.Item.inventory_count - 1);
            await productDao.updateProductInventoryCountByProductNumber(req.body.product_number, newInventory_Count);
            res.statusCode = 201; 
            return res.send({
                "message": `Added another copy of ${data.Item.product_name} to your cart.`
            });                                       
        } else {
            const existingItemsPlusNew = cartData.Item.items;
            existingItemsPlusNew.push( { 'product_number': req.body.product_number, 'quantity': 1, 'price': data.Item.price, 'product_name': data.Item.product_name } );
            await cartDao.updateCart(payload.username, existingItemsPlusNew);
            let newInventory_Count = (data.Item.inventory_count - 1);
            await productDao.updateProductInventoryCountByProductNumber(req.body.product_number, newInventory_Count);
            res.statusCode = 201; 
            return res.send({
                "message": `Added ${data.Item.product_name} to your cart.`
            }); 
        }   
    } catch(err) {
        if (err.name === 'JsonWebTokenError') {
            res.statusCode = 400;
            return res.send({
                "message": "Invalid JWT"
            })
        } else if (err) {
            res.statusCode = 500;
            return res.send({
                "message": err
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
                return res.send({
                    "message": "Your cart is empty."
                });  
            }                  
        } catch(err) {
            res.statusCode = 500;
            return res.send({
                "message": err
            });
        }
    } catch(err) {
        if (err.name === 'JsonWebTokenError') {
            res.statusCode = 400;
            return res.send({
                "message": "Invalid JWT"
            })
        } else if (err) {
            res.statusCode = 500;
            return res.send({
                "message": "no JWT"
            });
        }
    }
});

//REMOVE FROM CART
router.patch('/cart', async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1]; 
        const payload = await jwt.verifyToken(token);
        try {
            const data = await productDao.retrieveProductByNumber(req.body.product_number);
            if (data.Item) {
                try {
                    const cartData = await cartDao.retrieveItemsInCart(payload.username);
                    if (cartData.Item.items.length > 0) {
                        if (cartData.Item.items.find(item => item.product_number === req.body.product_number)) {
                            try {
                                const x = cartData.Item.items.map(e => e.product_number).indexOf(req.body.product_number);
                                let newQuantity = (cartData.Item.items[x].quantity) - 1;
                                const existingItemsMinusDupe = cartData.Item.items;
                                existingItemsMinusDupe.splice(x, 1);
                                if (newQuantity > 0) {
                                    existingItemsMinusDupe.push( { 'product_number': req.body.product_number, 'quantity': newQuantity, 'price': data.Item.price, 'product_name': data.Item.product_name })
                                    await cartDao.updateCart(payload.username, existingItemsMinusDupe);
                                    let newInventory_Count = (data.Item.inventory_count + 1);
                                    await productDao.updateProductInventoryCountByProductNumber(req.body.product_number, newInventory_Count);
                                    res.statusCode = 201; 
                                    return res.send({
                                        "message": `Removed a copy of ${data.Item.product_name} from your cart.`
                                    });
                                } else {
                                    if (existingItemsMinusDupe.length === 0) {
                                        await cartDao.updateCart(payload.username, existingItemsMinusDupe);
                                        let newInventory_Count = (data.Item.inventory_count + 1);
                                        await productDao.updateProductInventoryCountByProductNumber(req.body.product_number, newInventory_Count);
                                        res.statusCode = 201; 
                                        return res.send({
                                            "message": `Your cart is now empty.`
                                        });
                                    } else {
                                        await cartDao.updateCart(payload.username, existingItemsMinusDupe);
                                        let newInventory_Count = (data.Item.inventory_count + 1);
                                        await productDao.updateProductInventoryCountByProductNumber(req.body.product_number, newInventory_Count);
                                        res.statusCode = 201; 
                                        return res.send({
                                            "message": `Removed ${data.Item.product_name} from your cart.`
                                        });
                                    }
                                }
                            } catch (err) {
                                res.statusCode = 500;
                                return res.send({
                                    "message": err
                                });  
                            }                                           
                        } else {
                            res.statusCode = 401; 
                            return res.send({
                                "message": "This item is not in your cart."
                            });      
                        }                           
                    } else {
                        res.statusCode = 401; 
                        return res.send({
                            "message": "Your cart is already empty."
                        });                        
                    }              
                } catch (err) {
                    res.statusCode = 500;
                    return res.send({
                        "message": err
                    });  
                }
            } else {
                res.statusCode = 401;
                return res.send({
                    "message": `Product ${data.Item.product_name} doesn't exist.`
                })
            }
        } catch(err) {
            res.statusCode = 500;
            return res.send({
                "message": err
            });
        }
    } catch(err) {
        if (err.name === 'JsonWebTokenError') {
            res.statusCode = 400;
            return res.send({
                "message": "Invalid JWT"
            })
        } else if (err) {
            res.statusCode = 500;
            return res.send({
                "message": "no JWT"
            });
        }
    }
});

//ADD EMPTY GUEST CART
router.put('/cart', async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1]; 
        const payload = await jwt.verifyToken(token);
        await cartDao.addCart(payload.username, []);

    } catch(err) {
        if (err.name === 'JsonWebTokenError') {
            res.statusCode = 400;
            return res.send({
                "message": "Invalid JWT"
            })
        } else {
            res.statusCode = 500;
            return res.send({
                "message": err
            });
        }
    }
});


module.exports = router;