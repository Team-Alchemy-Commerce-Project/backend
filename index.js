//Contains opening dependencies and PORT information:

const express = require('express');
const bodyParser = require('body-parser');
//also not sure



//Router imports

const customerRouter = require('./route-files/customer_routes');
const productRouter = require('./route-files/product_routes');
const cartRouter = require('./route-files/cart_routes');
const emailRouter = require('./route-files/email_routes');
const profileRouter = require('./route-files/profile_routes');

const PORT = 3001;
const server = express();

server.use(bodyParser.json());
server.use(customerRouter);
server.use(productRouter);
server.use(cartRouter);
server.use(emailRouter);
server.use(profileRouter);



server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
}); 