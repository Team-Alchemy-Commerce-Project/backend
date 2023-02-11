//Contains opening dependencies and PORT information:

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

//Router imports
const registerRouter = require('./route-files/register_routes');
const loginRouter = require('./route-files/login_routes');
const productRouter = require('./route-files/product_routes');
const cartRouter = require('./route-files/cart_routes');
const orderRouter = require('./route-files/order_routes');

const PORT = 8080;
const server = express();
app.use(cors({
    origin: 'http://127.0.0.1:3000'
}));

const uuid = require('uuid');
const timestamp = require('unix-timestamp');
timestamp.round = true;

server.use(bodyParser.json());
server.use(registerRouter);
server.use(loginRouter);
server.use(productRouter);
server.use(cartRouter);
server.use(orderRouter);

server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
}); 