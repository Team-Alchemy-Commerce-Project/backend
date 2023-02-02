//Contains opening dependencies and PORT information:

const express = require('express');
const bodyParser = require('body-parser');

//Router imports
const userRouter = require('./route-files/user_routes');
const productRouter = require('./route-files/product_routes');

const PORT = 3000;
const server = express();

server.use(bodyParser.json());
server.use(userRouter);
server.use(productRouter);

server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
}); 