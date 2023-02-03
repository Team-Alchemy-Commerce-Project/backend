//Handles HTTP endpoints product-related requests:

const express = require('express');
const router = express.Router();

const jwt = require('../utility/jwts');
const uuid = require ('uuid');

const productDao = require('../dao-files/product_dao');

//ADD TO CART
router.post('/cart', async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1]; 
        const payload = await jwt.verifyToken(token);
        if (payload.username) {
            try {
                const data = await productDao.retrieveProductByID(req.body.product_id);
                if (data.Item) { 
                    try {
                        let cartData = await productDao.retrieveItemsInCart(payload.username);
                        const existingItems = cartData.Item.items;
                        existingItems.push(data.Item);
                        try {
                            await productDao.addItemToCart(payload.username, existingItems);
                            res.statusCode = 201; 
                            res.send({
                                "message": "Successfully added item to cart."
                            });
                        } catch (err) {
                            res.statusCode = 500;
                            res.send({
                                "message": err
                            });  
                        }                        
                    } catch (err) {
                        res.statusCode = 500;
                        res.send({
                            "message": err
                        });  
                    }
                } else {
                    res.statusCode = 401;
                    res.send({
                        "message": `Product with ID ${req.body.productID} doesn't exist.`
                    })
                }
            } catch(err) {
                res.statusCode = 500;
                res.send({
                    "message": err
                });
            }
        } else {
            res.statusCode = 401;
            res.send({
                "message": `You don't have an account with us yet.`
            })
        }
    } catch(err) {
        if (err.name === 'JsonWebTokenError') {
            res.statusCode = 400;
            res.send({
                "message": "Invalid JWT"
            })
        } else if (err) {
            res.statusCode = 500;
            res.send({
                "message": "no JWT"
            });
        }
    }
});

//Endpoint for admins to submit new products into the system for display/purchase:
// router.put('/products', async (req, res) => {
//     try {
// //         const authorizationHeader = req.headers.authorization;
// // //Gets the token from the authorization header to check for role: admin
// //         const token = authorizationHeader.split(" ")[1];
// //         const tokenPayload = await jwt.verifyToken(token);

//         // if (tokenPayload.role === 'admin') {
//             await productDao.addNewProduct(uuid.v4(), req.body.Description, req.body.Image, req.body.InStock, req.body.InventoryCount, req.body.Name, req.body.Price);
//                 res.send({
//                     "message": "New product successfully added to shop!"
//                 })
//         } catch(err) {
//             if (err.name === 'JsonWebTokenError') {
//                 res.statusCode = 400;
//                 res.send({
//                     "message": "Invalid JsonWebToken."
//             })
//         } else if (err.name === 'TypeError') {
//             res.statusCode = 400;
//             res.send({
//                 "message": "No Authorization header provided."
//             });
//         } else {
//             res.statusCode = 500;
//             //server error
//             res.send({
//                 "message": "Something went wrong. Please reload the page and try again. :/"
//             });
//         }
//     }
// });


// //Endpoint for customers to view all products:
// router.get('/products', async (req, res) => {
//     try {
//             let viewProducts = await productDao.viewAllProducts();
//             if (viewProducts.Items.length > 0) {
//                     res.send(viewProducts);
//             } else {
//                 res.send('The store is empty now. New items coming soon!')
//             }
//         }  catch(err) {
//                 if (err.name === 'TypeError') {
//                     res.statusCode = 400;
//                     res.send({
//                         "message": "No Authorization header provided."
//                 });
//                 } else {
//                     res.statusCode = 500;
//                     //server error
//                     res.send({
//                         "message": "Something went wrong. Please reload the page and try again. :/"
//                 });
//         }
//     }
// });


// // //Endpoint for admin to update products:
// router.patch('/products', async (req, res) => {
//     try {
//         const token = req.headers.authorization.split(" ")[1];
//         const tokenPayload = await jwt.verifyToken(token);

//         const data = await productDao.retrieveProductByProductNumber(ProductNumber);
//         const productItem = data.Item;

//         if (tokenPayload.role === 'admin') {
//             if (productItem) {
//                 productDao.updateTicketStatusByTicketID(req.body.ticket_id, req.body.updatedStatus);
//                 res.send({
//                     "message": "Ticket updated successfully!"
//                 })
//             } else {
//                 res.send({
//                     "message": "Ticket status may only be updated to 'approved' or 'denied'."
//                 })
//             }
//         } else {
//             res.send({
//                 "message": "Error: A ticket must be in 'pending' status to be processed as either 'approved' or 'denied'."
//             })
//         }
//         } else {
//             res.send({
//                 "message": "This ticket ID is not in 'pending' status. Please check ticket ID and try again."
//             })
//         }
//         } else {
//             res.send({
//                 "message": "You are not authorized for this action. If you are a manager, please log into your manager account to make changes to tickets."
//             })
//         }
//     } catch(err) {
//         if (err.name === 'JsonWebTokenError') {
//             res.statusCode = 400;
//             res.send({
//                 "message": "Invalid JsonWebToken."
//             })
//         } else if (err.name === 'TypeError') {
//             res.statusCode = 400;
//             res.send({
//                 "message": "No Authorization header provided."
//             });
//         } else {
//             res.statusCode = 500;
//             //server error
//             res.send({
//                 "message": "Something went wrong. Please reload the page and try again. :/"
//             });
//         }
//     }
// });


// //Endpoint for employees to view their tickets:
// router.get('/tickets/employee/view', async (req, res) => {
//     try {
//         const token = req.headers.authorization.split(" ")[1];
//         const tokenPayload = await jwt.verifyToken(token);

//         if (tokenPayload.role === 'employee') {
//             let viewingTickets = await productDao.retrieveTicketsByUsername(req.body.username);
//             const username = req.body.username;
// //Creates queue for employee tickets to be added to so they can be viewed
//             const viewingTicketsQueue = [];
//             viewingTicketsQueue.push(viewingTickets);
//             if (viewingTickets.Items.length > 0) {
//                     res.send(viewingTicketsQueue);
//             } else {
//                 res.send({
//                     "message": `${username} has no tickets in this system.`
//                 })
//             }
//         } else {
//             res.statusCode = 401;
//             res.send({
//                 "message": "You are not authorized for this action. If you are a manager, please log into your manager account to make changes to employee reimbursement tickets."
//             })
//         }
//     } catch(err) {
//         if (err.name === 'JsonWebTokenError') {
//             res.statusCode = 400;
//             res.send({
//                 "message": "Invalid JsonWebToken."
//             })
//         } else if (err.name === 'TypeError') {
//             res.statusCode = 400;
//             res.send({
//                 "message": "No Authorization header provided."
//             });
//         } else {
//             res.statusCode = 500;
//             //server error
//             res.send({
//                 "message": "Something went wrong. Please reload the page and try again. :/"
//             });
//         }
//     }
// });



module.exports = router;