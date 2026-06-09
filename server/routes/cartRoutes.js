import { Router } from 'express';
import { addToCart, getusercart,getupdatecart,getdeleteitemcart } from '../controllers/cartController.js';


const router = Router();
//router.post("/add",
router.post("/addcart", addToCart);
router.get("/cart/:userId", getusercart);
router.put("/updatecart", getupdatecart);
router.put('/deletecitemcart/:userId/:bookId',getdeleteitemcart );
//router.put('/updatecart',
export default router;

// // routes/cartRoutes.js
// import express from 'express';
// import Cart from '../models/Cart.js';
// import Product from '../models/Product.js';

// const router = express.Router();

// // Get cart for a user
// router.get('/:userId', async (req, res) => {
//     try {
//         const cart = await Cart.findOne({ userId: req.params.userId }).populate('items.productId');
//         res.status(200).json(cart);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// });

// // Add to cart


// router.post('/', async (req, res) => {
//     const { userId, productId, quantity, price } = req.body;

//     try {
//         const product = price ? null : await Product.findById(productId);
//         const productPrice = price || product.price;

//         let cart = await Cart.findOne({ userId });
//         if (!cart) {
//             cart = new Cart({ userId, items: [] });
//         }

//         const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
//         if (itemIndex > -1) {
//             cart.items[itemIndex].quantity += quantity;
//             cart.items[itemIndex].totalPrice = cart.items[itemIndex].quantity * productPrice;
//         } else {
//             cart.items.push({
//                 productId,
//                 quantity,
//                 price: productPrice,
//                 totalPrice: quantity * productPrice
//             });
//         }

//         await cart.save();
//         res.status(200).json(cart);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// });


// // router.post('/', async (req, res) => {
// //     const { userId, productId, quantity, price } = req.body;

// //     try {
// //         // Find the product to get the price (if price is not sent)
// //         if (!price) {
// //             const product = await Product.findById(productId);
// //             if (!product) {
// //                 return res.status(404).json({ error: 'Product not found' });
// //             }
// //             price = product.price;
// //         }

// //         // Find or create a cart for the user
// //         let cart = await Cart.findOne({ userId });
// //         if (!cart) {
// //             cart = new Cart({ userId, items: [] });
// //         }

// //         // Check if the item is already in the cart
// //         const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
// //         if (itemIndex > -1) {
// //             cart.items[itemIndex].quantity += quantity;
// //             cart.items[itemIndex].totalPrice = cart.items[itemIndex].quantity * price;
// //         } else {
// //             cart.items.push({
// //                 productId,
// //                 quantity,
// //                 price,
// //                 totalPrice: quantity * price
// //             });
// //         }

// //         await cart.save();
// //         res.status(200).json(cart);
// //     } catch (err) {
// //         res.status(500).json({ error: err.message });
// //     }
// // });

// // router.post('/', async (req, res) => {
// //     const { userId, productId, quantity, price } = req.body;

// //     try {
// //         // Find the product to get the price
// //         const product = await Product.findById(productId);
// //         if (!product) {
// //             return res.status(404).json({ error: 'Product not found' });
// //         }

// //         // Find or create a cart for the user
// //         let cart = await Cart.findOne({ userId });
// //         if (!cart) {
// //             cart = new Cart({ userId, items: [] });
// //         }

// //         // Check if the item is already in the cart
// //         const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
// //         if (itemIndex > -1) {
// //             cart.items[itemIndex].quantity += quantity;
// //             cart.items[itemIndex].totalPrice = cart.items[itemIndex].quantity * product.price;
// //         } else {
// //             cart.items.push({
// //                 productId,
// //                 quantity,
// //                 price: product.price,
// //                 totalPrice: quantity * product.price
// //             });
// //         }

// //         await cart.save();
// //         res.status(200).json(cart);
// //     } catch (err) {
// //         res.status(500).json({ error: err.message });
// //     }
// // });


// // router.post('/', async (req, res) => {
// //     try {
// //         const { userId, productId, quantity, price } = req.body;
// //         let cart = await Cart.findOne({ userId });

// //         if (!cart) {
// //             cart = new Cart({ userId, items: [{ productId, quantity, price }] });
// //         } else {
// //             const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);

// //             if (itemIndex > -1) {
// //                 cart.items[itemIndex].quantity += quantity;
// //             } else {
// //                 cart.items.push({ productId, quantity });
// //             }
// //         }

// //         await cart.save();
// //         res.status(200).json(cart);
// //     } catch (err) {
// //         res.status(500).json({ error: err.message });
// //     }
// // });

// // Update cart item quantity
// router.post('/update', async (req, res) => {
//     try {
//         const { itemId, quantity, price } = req.body;
//         const cart = await Cart.findOneAndUpdate(
//             { 'items._id': itemId },

//             { $set: { 'items.$.quantity': quantity } },
//             { new: true }
//         ).populate('items.productId');
//         res.status(200).json(cart);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// });

// // Remove item from cart
// router.post('/remove', async (req, res) => {
//     try {
//         const { itemId } = req.body;
//         const cart = await Cart.findOneAndUpdate(
//             { 'items._id': itemId },
//             { $pull: { items: { _id: itemId } } },
//             { new: true }
//         ).populate('items.productId');
//         res.status(200).json(cart);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// });

// export default router;
