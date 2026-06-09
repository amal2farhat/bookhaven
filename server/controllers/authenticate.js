// import jwt from 'jsonwebtoken';

// const authenticate = (req, res, next) => {
//   const token = req.headers['authorization'];

//   if (!token) {
//     return res.status(401).json({ message: 'No token provided' });
//   }

//   jwt.verify(token, 'amal', (err, decoded) => {
//     if (err) {
//       return res.status(500).json({ message: 'Failed to authenticate token' });
//     }

//     // Save user ID for later use
//     req.userId = decoded.id;
//     next();
//   });
// };

// export default authenticate;
