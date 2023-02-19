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


router.patch('/update/profile', async (req, res)=> {
    const token = req.headers.authorization.split(' ')[1]; 
    const payload = await JWT.verifyToken(token);
    if (payload){
        let data = await customerDAO.retrieveUserName(payload.username);
        let userItem = data.Item;
        if(userItem){
            await customerDAO.updateUserProfile(payload.username, req.body.password || userItem.password, req.body.email || userItem.email, req.body.street_address || userItem.address.street_address, req.body.city || userItem.address.city, req.body.state || userItem.address.state, req.body.zipcode1 || userItem.address.zipcode1, req.body.expiration || userItem.credit_card_info.expiration, req.body.last4digits || userItem.credit_card_info.last4digits, req.body.security_code || userItem.credit_card_info.security_code, req.body.zipcode2 || userItem.credit_card_info.zipcode2, req.body.full_name || userItem.full_name, req.body.phone_number || userItem.phone_number, req.body.profile_picture || userItem.profile_picture);
                res.statusCode = 200;
                res.send({'message': 'Successfully updated profile',
        });}

    }})
module.exports = router;