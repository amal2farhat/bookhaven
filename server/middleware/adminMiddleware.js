// module.exports = (req, res, next) => {
//     if (!req.user.isAdmin) return res.status(403).json({ message: 'Access denied' });
//     next();
// };


// middleware/isAdmin.js
const isAdmin = (req, res, next) => {
    if (!req.user.isAdmin) return res.status(403).json({ message: 'Access denied' });
    next();
};

export default isAdmin;


// // routes/someRoute.js usage
// import express from 'express';
// import isAdmin from '../middleware/isAdmin.js'; // Ensure the file extension is .js

// const router = express.Router();

// router.get('/admin', isAdmin, (req, res) => {
//     res.send('This is an admin route');
// });

// export default router;