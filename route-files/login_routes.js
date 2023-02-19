const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('../utility/jwts');
const { loginValidation } = require('../service/login-service');

router.post('/login', async (req, res) => {

    try {

        const username = req.body.username;
        const password = req.body.password;

        await loginValidation(username, password);

        res.statusCode = 200;
        
            return res.send({'message': 'Successful login.',
            "token": jwt.newToken(data.Item.username, data.Item.role)  
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