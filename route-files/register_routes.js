const express = require('express');
const router = express.Router();
const { registerValidation } = require('../service/user-service');

router.post('/register', async (req, res) => {

    try {

        const username = req.body.username;
        const password = req.body.password;
        const confirmPassword = req.body.confirm_password;
        const email = req.body.email;

        await registerValidation(username, req.body.street_address, req.body.city, req.body.state,
          req.body.zipcode1, email, req.body.full_name, req.body.profile_picture, 
          password, confirmPassword, req.body.phone_number);

    res.statusCode = 200;
    return res.send({'message': 'Successfully registered.'});

    } catch (err){

        if (err.name === 'LengthValidationError' || err.name === 'UsernameAlreadyTakenError' || err.name === 'EmailAlreadyTakenError' || err.name === 'PasswordMatchingError') {
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