// // controllers/cartController.js
// import Cart from '../models/Cart.js';
// import Product from '../models/Product.js';

// export const addToCart = async (req, res) => {
//     const { userId, productId, quantity } = req.body;

//     try {
//         const product = await Product.findById(productId);
//         if (!product) return res.status(404).json({ error: 'Product not found' });

//         let cart = await Cart.findOne({ userId });

//         if (cart) {
//             const itemIndex = cart.items.findIndex(item => item.productId.equals(productId));
//             if (itemIndex > -1) {
//                 cart.items[itemIndex].quantity += quantity;
//             } else {
//                 cart.items.push({ productId, quantity });
//             }
//             cart = await cart.save();
//         } else {
//             cart = new Cart({
//                 userId,
//                 items: [{ productId, quantity }]
//             });
//             await cart.save();
//         }

//         res.status(200).json(cart);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// };

// export const getCart = async (req, res) => {
//     const { userId } = req.params;

//     try {
//         const cart = await Cart.findOne({ userId }).populate('items.productId');
//         if (!cart) return res.status(404).json({ error: 'Cart not found' });
//         res.status(200).json(cart);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// };
// routes/cart.js
import mongoose from 'mongoose';
import Cart from '../models/Cart.js'; // Ensure CategoryModel is correctly exported in Category.js
// import { status } from 'init';




// Add book to cart
// router.post("/add",
export const addToCart = async (req, res) => {
    const { userId, bookId, quantity } = req.body;

    try {
        let cart = await Cart.findOne({ userId });
        
        if (!cart) {
            // Create new cart if it doesn't exist
            cart = new Cart({ userId, books: [{ bookId, quantity }] });
        } else {
            // Check if the book is already in the cart
            const existingBook = cart.books.find(item => item.bookId.toString() === bookId);
            if (existingBook) {
                existingBook.quantity += quantity; // Update quantity
            } else {
                cart.books.push({ bookId, quantity }); // Add new book
            }
        }

        await cart.save();

        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get user's cart
//router.get("/:userId",
export const getusercart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.params.userId }).populate("books.bookId");
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const getupdatecart = async (req, res) => {
    const { userId, bookId, quantity } = req.body;
  
    if (!userId || !bookId || quantity === undefined) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
  
    try {
      console.log('Received data:', req.body);
  
      const cart = await Cart.findOne({ userId });
  
      if (!cart) {
        // If the cart does not exist, create it
        const newCart = new Cart({
          userId,
          books: [{ bookId, quantity }]
        });
        await newCart.save();
        console.log('Cart created:', newCart);
        return res.status(201).json({ message: 'Cart created successfully', cart: newCart });
      }
  
      const itemIndex = cart.books.findIndex(item => item.bookId.toString() === bookId);
  
      if (itemIndex === -1) {
        cart.books.push({ bookId, quantity }); // Add new book
      } else {
        if (quantity <= 0) {
          cart.books.splice(itemIndex, 1); // Remove item
        } else {
          cart.books[itemIndex].quantity = quantity; // Update quantity
        }
      }
  
      await cart.save();
      console.log('Updated cart:', cart);
      res.status(200).json({ message: 'Cart updated successfully', cart });
    } catch (error) {
      console.error('Error updating cart:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  export const getdeleteitemcart = async (req, res) => {
    const { userId, bookId } = req.params;

    // Validate bookId
    if (!mongoose.Types.ObjectId.isValid(bookId)) {
        return res.status(400).json({ message: "Invalid book ID" });
    }

    try {
      // const cartt = await Cart.findOne({ userId });
      // const itemIndex = cartt.books.findIndex(item => item.bookId.toString() === bookId);
      // const cartin=cartt.books[itemIndex];
      // console.log(cartin)
        const cart = await Cart.findOneAndUpdate(
            { userId },
            { $pull: { books:{bookId } } },
            { new: true }
        );

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }
        res.json({
          status:"Success",
          message:"Book removed from cart"
        })
        // res.json(cart);
    } catch (error) {
        console.error("Error in getdeleteitemcart:", error);
        res.status(500).json({ message: error.message });
    }
};
//   export const getdeleteitemcart = async (req, res) => {
//     const { userId, bookId } = req.params;

//     try {
//         // Log the incoming userId and bookId
//         console.log("User ID:", userId, "Book ID:", bookId);

//         const cart = await Cart.findOneAndUpdate(
//             { userId },
//             { $pull: { books: { bookId: mongoose.Types.ObjectId(bookId) } } }, 
//             { new: true }
//         );

//         if (!cart) {
//             return res.status(404).json({ message: "Cart not found" });
//         }

//         res.json(cart);
//         console.log(cart);
//     } catch (error) {
//         console.error("Error in getdeleteitemcart:", error); // Log the error
//         res.status(500).json({ message: error.message });
//     }
// };

  export const getdeleteitemcart2 = async (req, res) => {
    const { userId, bookId } = req.params;

    try {
        const cart = await Cart.findOneAndUpdate(
            { userId },
            { $pull: { books: { bookId: mongoose.Types.ObjectId(bookId) } } }, 
            { new: true }
        );

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//   export const getdeleteitemcart = async (req, res) => {
//     const { userId, bookId } = req.params;

//     try {
//         const cart = await Cart.findOneAndUpdate(
//             { userId },
//             { $pull: { books: { bookId } } }, // Remove the book with the specified bookId
//             { new: true } // Return the updated cart
//         );

//         if (!cart) {
//             return res.status(404).json({ message: "Cart not found" });
//         }

//         res.json(cart);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

//
// export const getupdatecart =  async (req, res) => {
//     const { userId, bookId, quantity } = req.body;
  
//     if (!userId || !bookId || quantity === undefined) {
//       return res.status(400).json({ message: 'Missing required fields' });
//     }
  
//     try {
//       // Find the user's cart
//       const cart = await Cart.findOne({ userId });
  
//       if (!cart) {
//         return res.status(404).json({ message: 'Cart not found' });
//       }
  
//       // Find the item in the cart
//       const itemIndex = cart.books.findIndex(item => item.bookId.toString() === bookId);
  
//       if (itemIndex === -1) {
//         return res.status(404).json({ message: 'Book not found in cart' });
//       }
  
//       // Update the quantity
//       if (quantity <= 0) {
//         // Optionally handle removal of the item if quantity is 0 or less
//         cart.books.splice(itemIndex, 1);
//       } else {
//         cart.books[itemIndex].quantity = quantity;
//       }
  
//       // Save the updated cart
//       await cart.save();
//       res.status(200).json({ message: 'Cart updated successfully', cart });
//     } catch (error) {
//       console.error('Error updating cart:', error);
//       res.status(500).json({ message: 'Internal server error' });
//     }
//   };
  

// Additional routes for updating or removing items can be added similarly


