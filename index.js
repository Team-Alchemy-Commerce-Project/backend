//Contains opening dependencies and PORT information:

const express = require('express');
const bodyParser = require('body-parser');

//Router imports

const customerRouter = require('./route-files/customer_routes');
const productRouter = require('./route-files/product_routes');
const cartRouter = require('./route-files/cart_routes');
const orderRouter = require('./route-files/order_routes');

const PORT = 3000;
const server = express();

const uuid = require('uuid');
const timestamp = require('unix-timestamp');
timestamp.round = true;

server.use(bodyParser.json());
server.use(customerRouter);
server.use(productRouter);
server.use(cartRouter);
server.use(orderRouter);

server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
}); 