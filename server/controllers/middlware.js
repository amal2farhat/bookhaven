// import UserModel from '../models/User.js';  // Adjust the import path as necessary

// const isAdmin = async (req, res, next) => {
//   try {
//     // Assuming userId is attached to the req object after authentication
//     const userId = req.userId;

//     if (!userId) {
//       return res.status(401).json({ message: 'Unauthorized' });
//     }

//     const user = await UserModel.findById(userId);

//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     if (!user.isAdmin) {
//       return res.status(403).json({ message: 'Access denied' });
//     }

//     // Proceed to the next middleware or route handler
//     next();
//   } catch (error) {
//     res.status(500).json({ message: `Error: ${error.message}` });
//   }
// };

// export default isAdmin;
