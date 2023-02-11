
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const {registerNewUser, retrieveUserName, retrieveUserEmail} = require('../dao-files/customer_dao');

router.post('/register', async (req, res) => {

  try {

    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    let data = await retrieveUserName(username);
    const newUser = data.Item;
    let userEmail = await retrieveUserEmail(email);
    const checkEmail = userEmail.Items[0]

    if (newUser) {

          res.statusCode = 400;
          res.send({'message': 'This name is taken, please try again'});
        
    }    
    
     else if (checkEmail){
         
        res.statusCode = 400;
        res.send({'message': 'Email is already taken, please try again'}); 
      
        }
   
      else {
      const hashPassword = await bcrypt.hash(password, 10);
      req.body.password = hashPassword;
      await registerNewUser(req.body.username, req.body.street_address, req.body.city, req.body.state,
                            req.body.zipcode1, req.body.last4digits, req.body.expiration, req.body.security_code,
                            req.body.zipcode2, req.body.email, req.body.full_name, req.body.profile_picture, 
                            req.body.password, req.body.phone_number);

      res.statusCode = 200;
      res.send({'message': 'Successfully register'});
  
     }
    
  } catch (err){

    res.statusCode = 500;
    res.send({'message': `${err}`})

  }

});

module.exports = router;