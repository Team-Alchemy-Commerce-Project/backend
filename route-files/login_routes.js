const express = require('express');
const router = express.Router();
const jwt = require('../utility/jwts');
const { loginValidation } = require('../service/login-service');
const { retrieveUserName } = require('../dao-files/customer_dao');
const uuid = require ('uuid');
const cartDao = require('../dao-files/cart_dao');

router.post('/login', async (req, res) => {

    try {

        const username = req.body.username;
        const password = req.body.password;

        await loginValidation(username, password);
        let data = await retrieveUserName(username);
        await cartDao.addCart(username, []);
        res.statusCode = 200;
        
            return res.send({'message': 'Successful login.',
            "token": jwt.newToken(username, data.Item.role)  
        });
            
    } catch (err){

        if (err.name === 'UsernameNotInDatabaseError' || err.name === 'PasswordNotInDatabaseError') {
        res.statusCode = 400;
        } else {
        res.statusCode = 500;
        }
        return res.send({
            "message": err.message
        });
    }
});

module.exports = router;

router.get('/login', async (req, res) => {

    try {
        const username = uuid.v4();
        await cartDao.addCart(username, []);
        res.statusCode = 200;
        
            return res.send({'message': 'Welcome guest.',
            "token": jwt.newToken(username, 'guest')  
        });
            
    } catch (err){

        return res.send({
            "message": err.message
        });
    }
});

module.exports = router;