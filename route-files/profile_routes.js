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
        res.send(userItem)

    }
})

router.patch('/customer/profile', async (req, res)=> {
    const token = req.headers.authorization.split(' ')[1]; 
    const payload = await JWT.verifyToken(token);
    if (payload){
        if(req.body.password){
            await customerDAO.updatePasswordByUsername(payload.username, req.body.password);
            res.send({
                "message": "Succuessfully updated password"
            })
        } else if(req.body.full_name){
            await customerDAO.updateNameByUsername(payload.username, req.body.full_name);
            res.send({
                "message": `Succuessfully updated name to ${req.body.full_name}`
            })
        }else if(req.body.city){
            await customerDAO.updateCityByUsername(payload.username, req.body.city);
            res.send({
                "message": `Succuessfully updated City to ${req.body.city}`
            })
        }else if(req.body.state){
            await customerDAO.updateStateByUsername(payload.username, req.body.state);
            res.send({
                "message": `Succuessfully updated State to ${req.body.state}`
            })
        }else if(req.body.street_address){
            await customerDAO.updateStreetAddressByUsername(payload.username, req.body.street_address);
            res.send({
                "message": `Succuessfully updated street address to ${req.body.street_address}`
            })
        }else if(req.body.zipcode){
            await customerDAO.updateZipcodeByUsername(payload.username, req.body.zipcode);
            res.send({
                "message": `Succuessfully updated zip code to ${req.body.zipcode}`
            })
        }else if(req.body.expiration){
            await customerDAO.updateExpirationByUsername(payload.username, req.body.expiration);
            res.send({
                "message": `Succuessfully updated credit card expiration to ${req.body.expiration}`
            })
        }else if(req.body.last4digits){
            await customerDAO.updateLast4DigitsByUsername(payload.username, req.body.last4digits);
            res.send({
                "message": `Succuessfully updated last 4 digits of credit card to ${req.body.last4digits}`
            })
        }else if(req.body.security_code){
            await customerDAO.updateSecurityCodeByUsername(payload.username, req.body.security_code);
            res.send({
                "message": `Succuessfully updated credit card security code to ${req.body.security_code}`
            })
        }else if(req.body.email){
            await customerDAO.updateEmailByUsername(payload.username, req.body.email);
            res.send({
                "message": `Succuessfully updated email to ${req.body.email}`
            })
        }else if(req.body.password){
            await customerDAO.updatePasswordByUsername(payload.username, req.bodypassword);
            res.send({
                "message": `Succuessfully updated password to ${req.body.password}`
            })
        }else if(req.body.phone_number){
            await customerDAO.updatePhoneNumberByUsername(payload.username, req.body.phone_number);
            res.send({
                "message": `Succuessfully updated phone number to ${req.body.phone_number}`
            })
        }else if(req.body.profile_picture){
            await customerDAO.updateProfilePictureByUsername(payload.username, req.body.profile_picture);
            res.send({
                "message": `Succuessfully updated profile picture`
            })
        }

    }
})

module.exports = router;