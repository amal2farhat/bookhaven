// import { Router } from "express";
// const router=Router();

// // import CategoryModel from '../models/Category.js';
// import { AllCategory, createCategory, deleteCategory, upload, GetoneCategorieByid, updateCategory } from "../controllers/AdminCategories.js";

import { Router } from "express";
import { addToStripe, verifypayment, userorder } from "../controllers/checkoutstipeController.js";
// import isAdmin from '../controllers/middlware.js';
// import authenticate from '../controllers/authenticate.js';

const router = Router();

router.post("/create-checkout-session", addToStripe);
router.post("/verify", verifypayment);
router.post("/userorders", userorder);

export default router;

// import express from 'express';
// import Stripe from 'stripe';
// import Cart from '../models/Cart.js';

// const router = express.Router();

// router.post('/create-checkout-session', async (req, res) => {
//     const { email } = req.body;

//     try {
//         const cart = await Cart.findOne({ email }).populate('items.productId');
//         if (!cart || !cart.items.length) {
//             return res.status(400).json({ error: 'No items in cart' });
//         }

//         const lineItems = cart.items.map(item => ({
//             price_data: {
//                 currency: 'usd',
//                 product_data: {
//                     name: item.productId.name,
//                 },
//                 unit_amount: item.totalPrice * 100, // Amount in cents
//             },
//             quantity: item.quantity,
//         }));

//         const session = await stripe.checkout.sessions.create({
//             payment_method_types: ['card'],
//             line_items: lineItems,
//             mode: 'payment',
//             success_url: `http://localhost:3000/sucess`,
//             cancel_url: `http://localhost:3000/cancel`,
//         });

//         res.json({ id: session.id });
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// });

// export default router;

// // import express from 'express';
// // import Stripe from 'stripe';
// // import Cart from '../models/Cart.js';

// // const router = express.Router();
// // const stripe = Stripe('_51Kn6ZnGvzR6AvazOTlQwa0dkpY1cJ5DyHyX8nnhE5FnODwLElcGXJW11Qp3GtpTTjSZK9ngRIItg5YYmBwXP70SD00AGRK9ekT'); // Replace with your Stripe secret key
// // //http://localhost:3001
// // // Create a Checkout Session
// // ///api/checkout/create-checkout-session
// // router.post("/create-checkout-session", async (req, res) => {
// //     const { products } = req.body;

// //     const lineItems = products.map((product) => ({
// //         price_data: {
// //             currency: "inr",
// //             product_data: {
// //                 name: product.name,
// //                 price: product.price
// //             },
// //             unit_amount: product.price * 100,
// //         },
// //         quantity: product.qnty
// //     }));

// //     const session = await stripe.checkout.sessions.create({
// //         payment_method_types: ["card"],
// //         line_items: lineItems,
// //         mode: "payment",
// //         success_url: "http://localhost:3000/sucess",
// //         cancel_url: "http://localhost:3000/cancel",
// //     });

// //     res.json({ id: session.id })

// // })

// // // router.post('/create-checkout-session', async (req, res) => {
// // //     try {
// // //         // const { userId } = req.body;

// // //         // Fetch cart items for the user
// // //         const cart = await Cart.findOne({ userId }).populate('items.productId');
// // //         if (!cart || !cart.items.length) {
// // //             return res.status(400).json({ error: 'No items in cart' });
// // //         }

// // //         // Create a line item for each product in the cart
// // //         const lineItems = cart.items.map(item => ({
// // //             price_data: {
// // //                 currency: 'usd',
// // //                 product_data: {
// // //                     name: item.productId.name,
// // //                 },
// // //                 unit_amount: item.totalPrice * 100, // Amount in cents
// // //             },
// // //             quantity: item.quantity,
// // //         }));

// // //         // Create a checkout session
// // //         const session = await stripe.checkout.sessions.create({
// // //             payment_method_types: ['card'],
// // //             line_items: lineItems,
// // //             mode: 'payment',
// // //             success_url: `http://localhost:3001/sucess`,
// // //             cancel_url: `http://localhost:3001/cancel`,
// // //         });

// // //         res.json({ id: session.id });
// // //     } catch (err) {
// // //         res.status(500).json({ error: err.message });
// // //     }
// // // });

// // export default router;
