
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const {retrieveUserName} = require('../dao-files/customer_dao')

router.get('/login', async (req, res) => {

    const username = req.body.username;
    const password = req.body.password;
    let data = await retrieveUserName(username);
    const userName = data.Item
    if (!userName){

        res.statusCode = 400;
        res.send({'message': 'Invalid username'})
    }

    const isValid = await bcrypt.compare(password, userName.password)

    if (!isValid) {

        res.statusCode = 401;
        res.send({'message': 'Invalid password'})
  
    } else {

        res.statusCode = 200;
        res.send({'message': 'You are successfully log in'});

    }

});


module.exports = router;