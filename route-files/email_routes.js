const express = require('express');
const router = express.Router();
const JWT = require('../utility/jwts');
const customerDAO = require('../dao-files/customer_dao')
const sendEmail = require('../utility/sendEmail')

router.post('/password', async (req, res) => {
    const email = req.body.email
    const data = await customerDAO.retrieveUserEmail(email);
    const userItem = data.Items[0];
    if(userItem){
        const token = JWT.newToken(userItem.username, userItem.role)

    sendEmail.sesTest(email, token).then((val) =>{
        console.log('got this back', val)
        res.statusCode = 201;
        res.send({
            "message":"successful"})
    }).catch((err) =>{
        res.send(err)
    })
}else{
    return res.send({
        message: "There is no user with the email " + email
    })
}
})



router.patch('/password', async (req, res) =>{
const resetToken = req.body.resetToken
let decodedToken = await JWT.decodeJwt(resetToken);
const username = req.body.username;
const newPassword = req.body.newPassword;

if(decodedToken.username === username){
    await customerDAO.updatePasswordByUsername(username, newPassword)
    return res.send({
       "message": `sucessfully reset ${username} password`
    })
}else{
    return res.send({
        "message": `you do not have permission to reset user ${username}'s password`
    })

}

})

module.exports = router;

