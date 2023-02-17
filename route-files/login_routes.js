
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const {retrieveUserName} = require('../dao-files/customer_dao')
const jwt = require('../utility/jwts');


router.post('/login', async (req, res) => {

try {

    const username = req.body.username;
    const password = req.body.password;
    let data = await retrieveUserName(username);
    const userName = data.Item
    if (!userName){

        res.statusCode = 400;
        res.send({'message': 'Invalid username.'})
    }

    const isValid = await bcrypt.compare(password, userName.password)

    if (!isValid) {

        res.statusCode = 401;
        res.send({'message': 'Invalid password.'})
  
    } else {

        res.statusCode = 200;
       
        res.send({'message': 'Successful login.',
        "token": jwt.newToken(userName.username, userName.role)  
    });
        
   
}

} catch (err){

    res.statusCode = 500;
    res.send({'message': `${err}`})
}

});


module.exports = router;