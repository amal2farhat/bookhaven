import dotenv from "dotenv";
dotenv.config();
import express from "express";
import Stripe from "stripe";
import Cart from "../models/Cart.js";
import Book from "../models/Book.js";
import Orders from "../models/Orders.js";
import User from "../models/User.js";

const router = express.Router();

console.log("STRIPE KEY:", process.env.STRIPE_SECRET_KEY);

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY); // Use environment variable
import mongoose from "mongoose"; // Ensure mongoose is imported

export const addToStripe = async (req, res) => {
  const { userId, email } = req.body;

  try {
    // Fetch cart and populate book details
    const cart = await Cart.findOne({ userId }).populate({
      path: "books.bookId", // Make sure this path is correct
      select: "bookName image price", // Replace with the fields you want to select
    });

    if (!cart || !cart.books.length) {
      return res.status(400).json({ error: "No books in cart" });
    }
    const user = await User.findById(userId); // Assuming userId is passed in the request
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }
    // Get shipping address from cart
    const location = user.address; // Or use `req.body.shippingAddress` if you pass it in the request

    // Create the order with populated book info
    const order = new Orders({
      userId: userId, // Use the `userId` passed in the request body
      shippingAddress: location, // Use the location from cart or request
      books: cart.books.map((item) => ({
        book: item.bookId._id, // Assign the ObjectId of the book
        priceAtOrder: item.bookId.price, //price from book model
        quantity: item.quantity, // Use quantity from the cart
        imageOrder: item.bookId.image,
      })),
    });

    // Save the order
    await order.save();
    console.log("Order saved:", order);

    // Create line items for the checkout session
    const lineItems = cart.books.map((item) => {
      // const imageUrl = 'http://localhost:3001/uploads/emptycart1.jpeg';
      // const imageUrl2 = 'C:\\Users\\Amal\\librarymern\\server\\uploads\\emptycart1.jpeg'.replace(/\\/g, '/');
      // This will output: 'C:/Users/Amal/librarymern/server/uploads/emptycart1.jpeg'

      // const imageUrl2 = 'C:\\Users\\Amal\\librarymern\\server\\uploads\\emptycart1.jpeg';
      const imageUrl = `http://localhost:3001/${item.bookId.image.replace(/\\/g, "/")}`; // Fix image URL

      // Log the book name and image URL for debugging
      console.log("Book Name:", item.bookId.bookName);
      console.log("Image URL:", item.bookId.image);
      console.log(imageUrl);
      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: item.bookId.bookName, // Book name for Stripe checkout
            images: [imageUrl], // Image URL for Stripe checkout
          },
          unit_amount: item.bookId.price * 100, // Amount in cents (USD)
        },
        quantity: item.quantity, // Quantity for this line item
      };
    });

    console.log("Line Items to Stripe: ", JSON.stringify(lineItems, null, 2));

    // Create a new Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `http://localhost:3000/verify?success=true&orderId=${order._id}`,
      // success_url: `http://localhost:3000/order/success/${order._id}?status=${order.status}`,
      cancel_url: `http://localhost:3000/verify?success=false&orderId=${order._id}`,
      // success_url: `http://localhost:3000/success`,
      // cancel_url: `http://localhost:3000/cancel`,
      customer_email: email, // Stripe customer email
    });

    // Send back the session ID to the frontend
    res.json({ id: session.id });
  } catch (err) {
    console.error("Error creating checkout session:", err); // Log error details
    res.status(500).json({ error: err.message }); // Send error response to client
  }
};

export const verifypayment = async (req, res) => {
  const { userId, orderId, success } = req.body;
  console.log("Received orderId:", orderId);
  console.log("Received success:", success);

  try {
    if (success === "true") {
      // Payment successful: Update the order status
      const order = await Orders.findByIdAndUpdate(
        orderId,
        { payment: true },
        { new: true }, // Return the updated document
      );

      if (!order) {
        return res.status(404).json({ success: false, message: "Order not found" });
      }

      // Fetch the user's cart to get the items and update book quantities
      const cart = await Cart.findOne({ userId }).populate({
        path: "books.bookId",
        select: "bookName price bookCountAvailable ",
      });

      if (!cart || !cart.books.length) {
        return res.status(400).json({ success: false, message: "No books in cart to update" });
      }

      // Prepare the update for book quantities
      const updatePromises = cart.books.map(async (item) => {
        const { bookId, quantity } = item;

        const book = await Book.findById(bookId);

        if (!book) {
          throw new Error(`Book with ID ${bookId} not found`);
        }

        // Calculate the new quantity for the book
        const newQuantity = book.bookCountAvailable - quantity;

        if (newQuantity < 0) {
          throw new Error(`Not enough stock for book: ${book.bookName}`);
        }

        console.log(`Updating book ${book.bookName} from ${book.bookCountAvailable} to ${newQuantity}`);

        // Update the book's available quantity
        return Book.findByIdAndUpdate(bookId, { bookCountAvailable: newQuantity }, { new: true });
      });

      // Perform all updates concurrently
      await Promise.all(updatePromises);

      // Optionally, you can clear the cart after the payment is successful
      //  cart.books = [];
      // await cart.save();
      await Cart.updateOne(
        { _id: cart._id },
        { $pull: { books: { bookId: { $in: cart.books.map((item) => item.bookId) } } } }, // Remove books from cart
      );

      res.json({ success: true, message: "Payment successful", order });
    } else if (success === "false") {
      // Payment failed or was canceled: Delete the order
      await Orders.findByIdAndDelete(orderId);

      // if (!deletedOrder) {
      //     return res.status(404).json({ success: false, message: 'Order not found' });
      // }

      res.status(204).send(); // No content, payment failed or canceled
    } else {
      return res.status(400).json({ success: false, message: "Invalid success value" });
    }
  } catch (error) {
    console.error("Error during payment verification:", error); // Log the error to the server console
    res.status(500).json({ success: false, message: "Internal server error", error: error.message });
  }
};

export const userorder = async (req, res) => {
  try {
    const { userId, email } = req.body;
    if (!userId) {
      return res.status(400).json({ success: false, message: "User ID is required" });
    }

    // Fetch orders for the user
    const orders = await Orders.find({ userId }).populate("books.book", "title author price bookName image"); // You may want to populate related fields like books

    if (!orders) {
      return res.status(404).json({ success: false, message: "No orders found" });
    }

    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ success: false, message: "An error occurred while fetching orders" });
  }
};

// export const verifypayment =async(req,res)=>{
//     const {userId, orderId, success } = req.body;
//     console.log('Received orderId:', orderId);
//     console.log('Received success:', success);
//     try {
//       if(success === 'true'){
//         const order = await Orders.findByIdAndUpdate(
//           orderId,
//           { payment: true },
//           { new: true } // Return the updated document
//         );
//         // await Order.findByIdAndUpdate(orderId,
//         //   { payment: true },
//         //   { new: true }
//         // );
//         const cart = await Cart.findOne({ userId }).populate({
//             path: 'books.bookId',   // Make sure this path is correct
//             select: 'bookName image price'  // Replace with the fields you want to select
//         });

//         const user = await User.findById(userId);

//         const updatePromises = cart.cart.map(async item => {
//           const productId = item.product._id;
//           const currentQuantity = item.product.quantity;
//           const quantityToSubtract = item.quantity;

//           console.log(`Current quantity for product ${productId}: ${currentQuantity}`);
//           console.log(`Quantity to subtract: ${quantityToSubtract}`);

//           if (typeof currentQuantity !== 'number' || typeof quantityToSubtract !== 'number') {
//             throw new Error(`Invalid quantity values for product ${productId}`);
//           }

//           const newQuantity = currentQuantity - quantityToSubtract;

//           if (isNaN(newQuantity)) {
//             throw new Error(`Calculated new quantity is NaN for product ${productId}`);
//           }

//           console.log(`Updating product ${productId} to new quantity ${newQuantity}`);

//           return Product.findByIdAndUpdate(productId, { quantity: newQuantity }, { new: true });
//         });
//         await Promise.all(updatePromises);
//         res.json({ success: true, message: "Payment successful", order });
//         // res.json({success:true ,message:"Paid" });

//       }else if(success === 'false'){
//         // const deletedOrder = await Order.findByIdAndDelete(orderId);

//         // if (!deletedOrder) {
//         //   return res.status(404).json({ success: false, message: "Order not found" });
//         // }

//         // res.json({ success: false, message: "Payment failed or canceled", deletedOrder });
//         await Order.findByIdAndDelete(orderId);
//         res.status(204).send(); // No Content
//         // res.json({success:false ,message:"Not Paid" });

//       }
//     } catch (error) {
//       res.json({success:false ,message:"Error" });
//     }
//   };

// router.post('/create-checkout-session',
// export const addToStripe =   async (req, res) => {
//     const { userId, email } = req.body;

//     try {
//         //  const cart = await Cart.findOne({ userId }).populate('books.bookId');
//         const cart = await Cart.findOne({ userId }).populate({
//             path: 'books.bookId',
//             select: 'bookName image price' // Replace with the fields you want to select
//           });
//         if (!cart || !cart.books.length) {
//             return res.status(400).json({ error: 'No books in cart' });
//         }

//         const location = cart.address;
//     //     const STATIC_SHIPPING_LOCATION = {
//     //   city: location.city,
//     //   address: location.address,
//     // };

//     const order = new Orders({
//         userId: "66e49d237337e78f67f5e718",
//       shippingAddress: "location",

//       // shippingLocation,
//       books: cart.books.map(item => ({
//         book: "shcjkschx",
//         quantity: 1,
//       })),
//     });

//     await order.save();
//     console.log('Order saved:', order);
//         // Create line items for the checkout session
//         const lineItems = cart.books.map(item => {
//             const imageUrl = `http://localhost:3001/${item.bookId.image.replace(/\\/g, '/')}`;
//             // const imageUrl = `http://localhost:3000/${item.bookId.image.replace(/\\/g, '/').jpg}`; // Convert backslashes to forward slashes for URLs
//             // const imageUrl = `http://localhost:3001/${item.bookId.image.replace(/\\/g, '/')}`; // Constructing the absolute URL
//             const imageUrl2 = `http://localhost:3001/${item.bookId.image.replace(/\\/g, '/')}`; // Constructing the absolute URL
//      const imageUrl3 = `http://192.168.0.104:3001/uploads/emptycart1.jpeg`;
//     const imageUrl4='http://localhost:3001/uploads/book2.jpg'
//             //  const imageUrl="https://example.com/valid-image.jpg";
// const im= item.bookId.image;
//             // Log the book name and image URL
//             console.log("Book Name: ", item.bookId.bookName);
//             console.log("Image URL: ", item.bookId.image); // Log the image URL

//             return {
//                 price_data: {
//                     currency: 'usd',
//                     product_data: {
//                         name: item.bookId.bookName, // Use the book's name
//                         //  images:[imageUrl3]

//                         // images: [item.bookId.image],

//                     //    // images:[`https://localhost:3001/${item.bookId.image.replace(/\\/g, '/')}`],
//                         images: [imageUrl], // Ensure this is a valid URL
//                     //    //   images: ["https://b.zmtcdn.com/data/pictures/9/18857339/8f53919f1175c08cf0f0371b73704f9b_o2_featured_v2.jpg?output-format=webp"],

//                     },
//                     unit_amount: item.bookId.price * 100, // Amount in cents
//                 },
//                 quantity: item.quantity,
//             };
//         });
//         console.log("Line Items to Stripe: ", JSON.stringify(lineItems, null, 2));
//         // Create a new checkout session
//         const session = await stripe.checkout.sessions.create({
//             payment_method_types: ['card'],
//             line_items: lineItems,
//             mode: 'payment',
//             success_url: `http://localhost:3000/success`,
//             cancel_url: `http://localhost:3000/cancel`,
//             customer_email: email,
//         });

//         res.json({ id: session.id });
//     } catch (err) {
//         console.error("Error creating checkout session: ", err); // Log error details
//         res.status(500).json({ error: err.message });
//     }
// }

//);
//

// router.post('/create-checkout-session', async (req, res) => {
//     const { userId,email } = req.body;

//     try {
//         const cart = await Cart.findOne({ userId }).populate('books.bookId');

//         if (!cart || !cart.books.length) {
//             return res.status(400).json({ error: 'No books in cart' });
//         }

//         // Create line items for the checkout session
//         const lineItems = cart.books.map(item => ({
//             console.log("Book Name: ", item.bookId.bookName);
//             console.log("Image URL: ", item.bookId.image); // Log the image URL

//             price_data: {
//                 currency: 'usd',
//                 product_data: {
//                     name: item.bookId.bookName, // Use the book's name
//                     images: [item.bookId.image],
//                     // images:`http://localhost:3000/${item.bookId.image}`,
//                     // images: ["https://b.zmtcdn.com/data/pictures/9/18857339/8f53919f1175c08cf0f0371b73704f9b_o2_featured_v2.jpg?output-format=webp"],

//                     // Optionally, you can add more properties like description
//                 },
//                 unit_amount: item.bookId.price * 100, // Amount in cents
//             },
//             quantity: item.quantity,

//         }

//     ));

//         // Create a new checkout session
//         const session = await stripe.checkout.sessions.create({
//             payment_method_types: ['card'],
//             line_items: lineItems,
//             mode: 'payment',
//             success_url: `http://localhost:3000/success`,
//             cancel_url: `http://localhost:3000/cancel`,
//             customer_email: email,
//         });

//         res.json({ id: session.id });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: err.message });
//     }
// });

//
// router.post('/create-checkout-session', async (req, res) => {
//     const { userId } = req.body;

//     try {
//         const cart = await Cart.findOne({ userId }).populate('books.bookId');
//         // const cart = await Cart.findOne({ userId }).populate('books.bookId');
//         // const cart = await Cart.findOne({ userId });
//         // console.log(cart);

//         // if (!cart || !cart.items.length) {
//         //     return res.status(400).json({ error: 'No books in cart' });
//         // }

//         const lineItems = cart.books.map(item => ({
//             price_data: {
//                 currency: 'usd',
//                 product_data: {
//                     // name: item.bookId.bookId,
//                     name:"bdbvd"
//                 },
//                 unit_amount: 1,
//                 // item.totalPrice * 100, // Amount in cents
//             },
//             quantity:1,
//             // quantity: item.quantity,
//         }));

//         const session = await stripe.checkout.sessions.create({
//             payment_method_types: ['card'],
//             line_items: lineItems,
//             mode: 'payment',
//             success_url: `http://localhost:3000/sucess`,
//             cancel_url: `http://localhost:3000/cancel`,
//         });

//         res.json({ id: session.id });
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// });

// export default router;
