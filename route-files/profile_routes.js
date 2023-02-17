const express = require('express');
const router = express.Router();
const JWT = require('../utility/jwts');
const customerDAO = require('../dao-files/customer_dao')


router.get('/customer/profile', async (req, res) => {
    const token = req.headers.authorization.split(' ')[1]; 
    const payload = await JWT.verifyToken(token);
    if (payload){
        let data = await customerDAO.retrieveUserName(payload.username);
        let userItem = data.Item;
        res.send(userItem);
    }
})


router.patch('/customer/profile', async (req, res)=> {
    const token = req.headers.authorization.split(' ')[1]; 
    const payload = await JWT.verifyToken(token);
    if (payload){
        await customerDAO.updateUserProfile(payload.username, req.body.password ,req.body.email, req.body.street_address, req.body.city, req.body.state, req.body.zipcode1, req.body.expiration, req.body.last4digits, req.body.security_code, req.body.zipcode2, req.body.full_name, req.body.phone_number, req.body.profile_picture);

            res.statusCode = 200;
            res.send({'message': 'Successfully updated profile'});

    }})
module.exports = router;