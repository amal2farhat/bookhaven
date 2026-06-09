// controllers/authController.js
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import UserModel from '../models/User.js';  // Ensure the file extension is .js

// export const signup = async (req, res) => {
//     try {
//         const { name, email, password } = req.body;
//         // const hashedPassword = await bcrypt.hash(password, 12);
//         const newUser = new UserModel({ name, email, password });
//         await newUser.save();
//         res.status(201).json({ message: 'User created successfully' });
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// };

export const createUser = async (req, res) => {
    try {
      const { userFullName, address, email, password, confirmPassword, isAdmin } = req.body;
  
      // Input validation
      if (!userFullName || !address || !email || !password || !confirmPassword) {
        return res.status(400).json({ message: 'All fields are required' });
      }
  
      if (password !== confirmPassword) {
        return res.status(400).json({ message: 'Passwords do not match' });
      }
  
      const emailRegex = /\S+@\S+\.\S+/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ message: 'Invalid email format' });
      }
  
      const existingUser = await UserModel.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'Email is already exist' });
      }
      // Hash the password
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
  
      // Create the new user
      const newUser = new UserModel({
        userFullName,
        address,
        email,
        password: hashedPassword,
        isAdmin,
      });
  
      await newUser.save();
  
      res.status(201).json({ message: 'User created successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: err.message });
    }
  };

export const getuserinfo=async (req, res) => {
    const { userId } = req.params;

    try {
        const user = await UserModel.findById(userId);
        
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Don't send the password for security reasons
        const { password, ...userProfile } = user.toObject();
        res.status(200).json(userProfile); // Return all user data except password
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error: ' + err.message });
    }
};
 
export const updateProfile = async (req, res) => {
    try {
        const { userFullName, address, email, password } = req.body;
        const userId = req.params.userId;  // Get user ID from URL params

        // Validate that the user exists
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Check if the email is being changed and ensure it's unique
        if (email && user.email !== email) {
            const emailExists = await UserModel.findOne({ email });
            if (emailExists) {
                return res.status(400).json({ message: "Email is already taken" });
            }
            user.email = email;
        }

        // Update password if provided (with hashing)
        if (password) {
            const saltRounds = 10;
            user.password = await bcrypt.hash(password, saltRounds);
        }

        // Update other fields
        if (userFullName) user.userFullName = userFullName;
        if (address) user.address = address;

        // Save the updated user to the database
        await user.save();

        res.status(200).json({ message: "Profile updated successfully", user });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
};
//   export const updateProfile = async (req, res) => {
//       try {
//         //const { userFullName, address, email, password, confirmPassword, isAdmin } = req.body;
//           const { userFullName, address, email, password } = req.body;
//           const userId = req.params.id;  // Get user ID from URL params (to ensure the user is updating their own data)
  
//           // Validate that the user exists
//           const user = await UserModel.findById(userId);
//           if (!user) {
//               return res.status(404).json({ message: "User not found" });
//           }
  
//           // Check if the email is being changed and ensure it's unique
//           if (email && user.email !== email) {
//               const emailExists = await UserModel.findOne({ email });
//               if (emailExists) {
//                   return res.status(400).json({ message: "Email is already taken" });
//               }
//               user.email = email;
//           }
  
//           // Update password if provided (with hashing)
//           if (password) {
//               const saltRounds = 10;
//               user.password = await bcrypt.hash(password, saltRounds);
//           }
  
//           // Update other fields
//           if (userFullName) user.userFullName = userFullName;
//           if (address) user.address = address;
  
//           // Save the updated user to the database
//           await user.save();
  
//           res.status(200).json({ message: "Profile updated successfully", user });
//       } catch (err) {
//           console.error(err);
//           res.status(500).json({ message: err.message });
//       }
//   };
  

  export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            console.log('Email or password not provided');
            return res.status(400).json({ message: "Email and password are required" });
        }

        const user = await UserModel.findOne({ email });
        if (!user) {
            console.log('User not found');
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log('Password mismatch');
            return res.status(401).json({ message: "Invalid email or password" });
        }

     

        // Respond with user data and token
        res.status(200).json({
            user: {
                id: user._id,
                userFullName: user.userFullName,
                email: user.email,
                isAdmin: user.isAdmin
            },
            // token // Include the token in the response
        });

        console.log(user);
        console.log(user.isAdmin);
    } catch (error) {
        console.error('Login error:', error.message);
        res.status(500).json({ message: `Error: ${error.message}` });
    }
};

// export const createUser = async (req, res) => {
//     try {
//         const { userFullName, address, email, password, confirmPassword, isAdmin } = req.body;

//     // Input validation
//     if (!userFullName || !address || !email || !password || !confirmPassword) {
//       return res.status(400).json({ message: 'All fields are required' });
//     }

//     if (password !== confirmPassword) {
//       return res.status(400).json({ message: 'Passwords do not match' });
//     }
//         // // if (userFullName && address && email && password && isAdmin) {
//         // const { userFullName,address,email,password,isAdmin} = req.body;
//         //  // Input validation
//         //  if (!userFullName || !address || !email || !password) {
//         //     return res.status(400).json({ message: 'All fields are required' });
//         // }
      
//         const emailRegex = /\S+@\S+\.\S+/;
//         if (!emailRegex.test(email)) {
//             return res.status(400).json({ message: 'Invalid email format' });
//         }

//         const saltRounds = 10; // You can adjust the salt rounds for bcrypt
//         const hashedPassword = await bcrypt.hash(password, saltRounds);
//         const newUser = new UserModel({ userFullName, address, email,password:hashedPassword,isAdmin });
//         await newUser.save();
//         res.status(201).json({ message: 'User created successfully' });
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// };

// 
// export const createUser1 = async (req, res) => {
//     try {
//         // if (userFullName && address && email && password && isAdmin) {
//         const { userFullName,address} = req.body;

//         //   if (!Validate.string(name) || !Validate.string(description)) {
//         //     return res.status(400).json({ message: "Invalid input data" });
//         //   }

//         //   const images = req.file ? req.file.path : null; 

//         //   const existingCategory = await CategoryModel.findOne({ name });
//         //   if (existingCategory) {
//         //     return res.status(400).json({ message: "Category name already exists" });
//         //   }
//         const saltRounds = 10; // You can adjust the salt rounds for bcrypt
//         const hashedPassword = await bcrypt.hash(password, saltRounds);

//         const newUser = new UserModel({ userFullName,address });
//         await newUser.save();
//         res.status(201).json(newUser);
//     } catch (error) {
//         res.status(500).json({ message: `Error: ${error.message}` });
//     }
// };
// authcontroller.js
// export const loginUser = async (req, res) => {
//     try {
//         const { email, password } = req.body;

//         if (!email || !password) {
//             console.log('Email or password not provided');
//             return res.status(400).json({ message: "Email and password are required" });
//         }

//         const user = await UserModel.findOne({ email });
//         if (!user) {
//             console.log('User not found');
//             return res.status(401).json({ message: "Invalid email or password" });
//         }

//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) {
//             console.log('Password mismatch');
//             return res.status(401).json({ message: "Invalid email or password" });
//         }

//         res.status(200).json({
//             user: {
//                 id: user._id,
//                 userFullName: user.userFullName,
//                 email: user.email,
//                 // isAdmin: user.isAdmin // Add user role here
//             }
           
//         });
//         console.log(userFullName);
//     } catch (error) {
//         console.error('Login error:', error.message);
//         res.status(500).json({ message: `Error: ${error.message}` });
//     }
// };



// export const loginUser = async (req, res) => {
//     try {
//         const { email, password } = req.body;

//         if (!email || !password) {
//             console.log('Email or password not provided');
//             return res.status(400).json({ message: "Email and password are required" });
//         }

//         const user = await UserModel.findOne({ email });
//         if (!user) {
//             console.log('User not found');
//             return res.status(401).json({ message: "Invalid email or password" });
//         }

//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) {
//             console.log('Password mismatch');
//             return res.status(401).json({ message: "Invalid email or password" });
//         }

//         res.status(200).json({
//             user: {
//                 id: user._id,
//                 userFullName: user.userFullName,
//                 email: user.email,
//                 isAdmin: user.isAdmin // Add user role here if needed
//             }
//         });
//         console.log(user.userFullName);
//         console.log(user.isAdmin) // Correctly reference userFullName
//     } catch (error) {
//         console.error('Login error:', error.message);
//         res.status(500).json({ message: `Error: ${error.message}` });
//     }
// };


// export const loginUser = async (req, res) => {
//     try {
//         const { email, password } = req.body;

//         if (!email || !password) {
//             console.log('Email or password not provided');
//             return res.status(400).json({ message: "Email and password are required" });
//         }

//         const user = await UserModel.findOne({ email });
//         if (!user) {
//             console.log('User not found');
//             return res.status(401).json({ message: "Invalid email or password" });
//         }

//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) {
//             console.log('Password mismatch');
//             return res.status(401).json({ message: "Invalid email or password" });
//         }

//         res.status(200).json({
//             user: {
//                 id: user._id,
//                 name: user.name,
//                 email: user.email
//             }
//         });
//     } catch (error) {
//         console.error('Login error:', error.message);
//         res.status(500).json({ message: `Error: ${error.message}` });
//     }
// };

// export const loginUser = async (req, res) => {
//     try {
//         const { email, password } = req.body;

//         // Validate input data
//         if (!email || !password) {
//             return res.status(400).json({ message: "Email and password are required" });
//         }

//         // Find the user by email
//         const user = await UserModel.findOne({ email });
//         if (!user) {
//             return res.status(401).json({ message: "Invalid email or password" });
//         }

//         // Compare provided password with hashed password in the database
//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) {
//             return res.status(401).json({ message: "Invalid email or password" });
//         }

//         // Create a JWT token
//         // const token = jwt.sign(
//         //     { userId: user._id, email: user.email },
//         //      process.env.JWT_SECRET, // Your JWT secret from environment variables
//         //     { expiresIn: '1h' } // Token expiration time
//         // );

//         // Respond with token and user information
//         res.status(200).json({
//             // token,
//             user: {
//                 id: user._id,
//                 name: user.name,
//                 email: user.email
//             }
//         });
//     } catch (error) {
//         res.status(500).json({ message: `Error: ${error.message}` });
//     }
// };
// export const login = async (req, res) => {
//     try {
//         const { email, password } = req.body;
//         const user = await UserModel.findOne({ email });
//         if (!user || !(await bcrypt.compare(password, user.password))) {
//             return res.status(400).json({ message: 'Invalid credentials' });
//         }
//         const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, 'your_jwt_secret');
//         res.status(200).json({ token });
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// };

