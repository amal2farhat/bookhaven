// // controllers/orderController.js
// import Order from '../models/Order.js'; // Ensure the file extension is .js

// export const createOrder = async (req, res) => {
//     try {
//         const { products, total } = req.body;
//         const newOrder = new Order({ user: req.user.id, products, total });
//         await newOrder.save();
//         res.status(201).json(newOrder);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// };

// export const getOrders = async (req, res) => {
//     try {
//         const orders = await Order.find({ user: req.user.id }).populate('products.product');
//         res.status(200).json(orders);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// };
