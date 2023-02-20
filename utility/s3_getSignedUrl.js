const AWS = require('aws-sdk');

AWS.config.update({
    region: 'us-east-1'
});

s3 = new AWS.S3({apiVersion: '2006-03-01'});

/*const params = {Bucket: 'alchemy-books', Key: 'cover1.jpg'};

function getCoverArt() {
    console.log(s3.getSignedUrl('getObject', params, {
        expiresIn: 800
    }));
}*/

function getCoverArt() {
    console.log(s3.getSignedUrl('getObject', {Bucket: 'alchemy-books', Key: 'cover9.jpg', Expires: 604800} ));
}

getCoverArt();

//to run: node s3_listobjects.js

// Create the parameters for calling listObjects
/*const bucketParams = {
  Bucket : 'alchemy-books',
};*/

// Call S3 to obtain a list of the objects in the bucket
/*function getCoverArt() {
    return s3.listObjects(bucketParams).promise();
}*/
