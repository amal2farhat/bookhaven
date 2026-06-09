// // controllers/productController.js
// import Product from '../models/Product.js'; // Ensure the file extension is .js

// export const getProducts = async (req, res) => {
//     try {
//         const products = await Product.find();
//         res.status(200).json(products);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// };

// export const createProduct = async (req, res) => {
//     try {
//         const newProduct = new Product(req.body);
//         await newProduct.save();
//         res.status(201).json(newProduct);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// };

// export const updateProduct = async (req, res) => {
//     try {
//         const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
//         res.status(200).json(updatedProduct);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// };

// export const deleteProduct = async (req, res) => {
//     try {
//         await Product.findByIdAndDelete(req.params.id);
//         res.status(200).json({ message: 'Product deleted' });
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// };
