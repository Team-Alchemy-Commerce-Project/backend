//Contains opening dependencies and PORT information:

const express = require('express');
const bodyParser = require('body-parser');




const cors = require('cors');


//Router imports
const registerRouter = require('./route-files/register_routes');
const loginRouter = require('./route-files/login_routes');
const productRouter = require('./route-files/product_routes');
const cartRouter = require('./route-files/cart_routes');

const emailRouter = require('./route-files/email_routes');
const profileRouter = require('./route-files/profile_routes');


const orderRouter = require('./route-files/order_routes');

const loggingMiddleware = require('./middleware/logger');

const PORT = 8080;

const server = express();
server.use(cors({
    origin: 'http://localhost:3000'
}));

const uuid = require('uuid');
const timestamp = require('unix-timestamp');
timestamp.round = true;

server.use(loggingMiddleware);

server.use(bodyParser.json());
server.use(registerRouter);
server.use(loginRouter);
server.use(productRouter);
server.use(cartRouter);

server.use(emailRouter);
server.use(profileRouter);



server.use(orderRouter);




server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
}); 