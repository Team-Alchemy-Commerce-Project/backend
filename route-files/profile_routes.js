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
        }

    }
})

module.exports = router;