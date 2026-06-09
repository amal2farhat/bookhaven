
// // import { Router } from 'express';

// // import orderController from '../controllers/orderController.js';
// // import authMiddleware from '../middleware/authMiddleware';

// // const router = Router();


// // // const orderController = require('../controllers/orderController');
// // // const authMiddleware = require('../middleware/authMiddleware');

// // router.post('/', authMiddleware, orderController.createOrder);
// // router.get('/', authMiddleware, orderController.getOrders);

// // module.exports = router;


// // routes/orders.js
// import express from 'express';
// import authMiddleware from '../middleware/authMiddleware.js'; // Ensure the file extension is .js
// import { createOrder, getOrders } from '../controllers/orderController.js'; // Ensure the file extension is .js

// const router = express.Router();

// router.post('/', authMiddleware, createOrder);
// router.get('/', authMiddleware, getOrders);

// export default router;