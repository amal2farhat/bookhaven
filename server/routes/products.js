// // const express = require('express');
// // const router = express.Router();
// // const productController = require('../controllers/productController');
// // const authMiddleware = require('../middleware/authMiddleware');
// // const adminMiddleware = require('../middleware/adminMiddleware');

// // router.get('/', productController.getProducts);
// // router.post('/', authMiddleware, adminMiddleware, productController.createProduct);
// // router.put('/:id', authMiddleware, adminMiddleware, productController.updateProduct);
// // router.delete('/:id', authMiddleware, adminMiddleware, productController.deleteProduct);

// // module.exports = router;


// // routes/products.js
// // import { Router } from 'express';

// // import { getProducts, createProduct, updateProduct, deleteProduct } from '../controllers/productController.js'; // Ensure the file extension is .js

// // const router = Router();

// // router.get('/', getProducts);
// // router.post('/', createProduct);
// // router.put('/:id', updateProduct);
// // router.delete('/:id', deleteProduct);

// // export default router;
// //////////////////


// // routes/productRoutes.js
// import express from 'express';
// import Product from '../models/Product.js';

// const router = express.Router();

// router.get('/', async (req, res) => {
//     try {
//         const products = await Product.find();
//         res.status(200).json(products);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// });

// router.post('/', async (req, res) => {
//     try {
//         const newProduct = new Product(req.body);
//         await newProduct.save();
//         res.status(201).json(newProduct);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// });

// router.put('/:id', async (req, res) => {
//     try {
//         const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
//         res.status(200).json(updatedProduct);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// });

// router.delete('/:id', async (req, res) => {
//     try {
//         await Product.findByIdAndDelete(req.params.id);
//         res.status(200).json({ message: 'Product deleted' });
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// });

// export default router;

