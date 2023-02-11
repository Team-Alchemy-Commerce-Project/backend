const AWS = require('aws-sdk');

AWS.config.update({
    region: 'us-east-1'
});

const AWS_SES = new AWS.SES({apiVersion: '2010-12-01'})

function sesTest(emailTo, token){

    const params = {
        Destination: {
            ToAddresses: [emailTo]
        },
        Message: {
            Body: {
                Text: {
                    Data: "To reset password, click this link: http://127.0.0.1:3001/password/" + "\n" + "Reset token:" + token
                }
            },
            Subject: {
                Data: "Reset Password Link"
            }
        },
        Source: "garrettsnedeker20@gmail.com"
    };
    return AWS_SES.sendEmail(params).promise();
}

module.exports = {
    sesTest
}