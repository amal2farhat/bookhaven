import React, { useEffect, useState } from "react";
import Axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete"; // Delete icon
// import { FaTrash } from "react-icons/fa";

import { useNavigate } from "react-router-dom"; // Add this for navigation
import emptyCartImage from "../../../src/assets/images/emptycart3.png";
import { loadStripe } from "@stripe/stripe-js";
import styles from "./cart.module.css";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);
const Cart = () => {
  const [cart, setCart] = useState({ books: [] });
  // const [cart, setCart] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const api = "http://localhost:3001";
  const navigate = useNavigate(); // Use history for navigation
  // const userId = localStorage.getItem("userId");
  const userId = localStorage.getItem("userId");
  const userName = localStorage.getItem("userName");
  // useEffect(() => {
  //   const checkLoginStatus = () => {
  //     const userId = localStorage.getItem("userId");
  //     if (userId) {
  //       setIsLoggedIn(true);
  //       fetchCart(userId);
  //     } else {
  //       setIsLoggedIn(false);
  //       alert("Please log in to view your cart.");
  //       navigate("/signin");
  //     }
  //   };
  //   const fetchCart = async (userId) => {
  //     try {
  //       const response = await Axios.get(`${api}/cart/${userId}`);
  //       setCart(response.data);
  //     } catch (error) {
  //       console.error("Error fetching cart:", error);
  //     }
  //   };

  //   checkLoginStatus();
  // }, [navigate, api]);

  useEffect(() => {
    const fetchCart = async () => {
      const userId = localStorage.getItem("userId");

      if (!userId) {
        // setIsLoggedIn(false);
        // alert("Please log in to view your cart.");
        navigate("/signin");
      }
      // alert("Please log in to perform this action.");}

      // if (!userId) {
      //   alert("Please log in to view your cart.");
      //   navigate("/signin");
      //   return;
      // }
      try {
        const response = await Axios.get(`${api}/cart/${userId}`);
        setCart(response.data);
        setIsLoggedIn(true);
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };

    fetchCart();
  }, []);

  const updateQuantity = async (bookId, quantity) => {
    const userId = localStorage.getItem("userId");
    try {
      await Axios.put(`${api}/updatecart`, { userId, bookId, quantity });
      // Update the local state only after a successful update
      const updatedCart = cart.books.map((item) =>
        item.bookId._id === bookId ? { ...item, quantity } : item,
      );
      setCart({ ...cart, books: updatedCart });
    } catch (error) {
      console.error("Error updating cart:", error);
    }
  };
  const handleDeletecart = async (bookId) => {
    if (!isLoggedIn) {
      alert("Please log in to perform this action.");
      return navigate("/signin");
    }
    const userId = localStorage.getItem("userId");
    try {
      const response = await Axios.put(`${api}/deletecitemcart/${userId}/${bookId}`);
      console.log("Delete response:", response.data);
      setCart((prevCart) => ({
        ...prevCart,
        books: prevCart.books.filter((item) => item.bookId._id !== bookId),
      }));
      alert(response.data.message);
      console.log(response.data);
    } catch (error) {
      console.error("Error deleting item:", error.response ? error.response.data : error.message);
    }
  };

  // const handleDeletecart = async (bookId) => {
  //   const userId = localStorage.getItem("userId");
  //   try {
  //     await Axios.delete(`${api}/deletecitemcart/${userId}/${bookId}`);
  //     // Optionally update the state after deletion
  //     setCart((prevCart) => ({
  //       ...prevCart,
  //       books: prevCart.books.filter((item) => item.bookId._id !== bookId),
  //     }));
  //   } catch (error) {
  //     console.error("Error deleting item:", error);
  //   }
  // };

  //   const handleCheckout = async () => {
  //     const userId = localStorage.getItem('userId');
  //     try {
  //         const response = await Axios.post('http://localhost:3001/create-checkout-session', {userId}
  //             // userId: '66e49d237337e78f67f5e718', // Replace with actual user ID
  //         );

  //         const sessionId = response.data.id;

  //         // Redirect to Stripe Checkout
  //         const stripe = await stripePromise;
  //         // const stripe = await loadStripe('your_stripe_public_key_here'); // Replace with your actual public key
  //         await stripe.redirectToCheckout({ sessionId });
  //     } catch (error) {
  //         console.error('Error creating checkout session:', error);
  //     }
  // };
  const handlePayment = async () => {
    const userId = localStorage.getItem("userId");
    const email = localStorage.getItem("email");
    try {
      // const email = "example@domain.com"; // Replace with actual user email
      // const _id = "6698fbc2c133f8cbea516665";
      // Make a request to your backend to create a Checkout Session
      const response = await Axios.post(
        `${api}/create-checkout-session`,
        { userId, email },
        { headers: { "Content-Type": "application/json", Accept: "image/jpeg" } },
      );

      const { id } = response.data;
      const stripe = await stripePromise;

      // Redirect to Checkout
      const { error } = await stripe.redirectToCheckout({ sessionId: id });
      if (error) {
        console.error("Error during checkout:", error);
      }
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };

  // const updateQuantity = async (bookId, quantity) => {
  //     const userId = localStorage.getItem('userId');
  //     try {
  //       await Axios.put(`${api}/updatecart`, { userId, bookId, quantity });
  //       const updatedCart = cart.books.map(item =>
  //         item.bookId._id === bookId ? { ...item, quantity } : item
  //       );
  //       setCart({ ...cart, books: updatedCart });
  //     } catch (error) {
  //       console.error("Error updating cart:", error);
  //     }
  //   };

  if (!cart)
    return (
      <>
        <div className={styles.title}>
          Shopping Cart
          {/* :{userId} {userName}{" "} */}
        </div>
        <div className={styles.emptyCart}>
          <p className={styles.emptyCart}>Your Cart is Empty.</p>
          <img src={emptyCartImage} alt="Empty Cart" style={{ width: "600px", height: "600px" }} />
        </div>
      </>
    );
  // <div>Loading...</div>;

  return (
    <div className={styles.allcontainer}>
      <div className={styles.shoppingcart}>
        <div className={styles.title}>
          Shopping Cart
          {/* :{userId} {userName}{" "} */}
        </div>

        {cart.books.length === 0 ? (
          <div className={styles.emptyCart}>
            <p className={styles.emptyCart}>Your Cart is Empty.</p>
            <img src={emptyCartImage} alt="Empty Cart" style={{ width: "600px", height: "600px" }} />
          </div>
        ) : (
          <>
            <div className={styles.itemheader}>
              <div className={styles.ac}>Action</div>
              <div className={styles.im}>Image</div>
              <div className={styles.desc}>Book Name</div>
              <div className={styles.qu}>Quantity</div>
              <div className={styles.pr}>Price</div>
              <div className={styles.tot}>Total</div>
            </div>

            {cart.books.map((item) => {
              return (
                <div className={styles.item} key={item.bookId._id}>
                  <div className={styles.buttons}>
                    <DeleteIcon
                      className={styles.delicon}
                      onClick={() => handleDeletecart(item.bookId._id)}
                    />
                  </div>
                  <div className={styles.imagee}>
                    <img src={`${api}/${item.bookId.image}`} alt={item.bookId.bookName} />
                  </div>

                  <div className={styles.description}>
                    <span>{item.bookId.bookName}</span>
                  </div>

                  <div className={styles.quantity}>
                    <button
                      className={styles.plusbtn}
                      onClick={() => updateQuantity(item.bookId._id, item.quantity + 1)}
                      type="button"
                    >
                      +
                    </button>
                    <input
                      className={styles.inputt}
                      type="text"
                      name="quantity"
                      value={item.quantity}
                      readOnly
                    />
                    <button
                      className={styles.minusbtn}
                      onClick={() => updateQuantity(item.bookId._id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                      type="button"
                    >
                      -
                    </button>
                  </div>

                  <div className={styles.totalprice}>${item.bookId.price.toFixed(2)}</div>
                  <div className={styles.totalprice}>${(item.bookId.price * item.quantity).toFixed(2)}</div>
                </div>
              );
            })}

            <div className={styles.divtotal}>
              <div className={styles.sumt}>Total Price:</div>
              <div className={styles.sumtotal}>
                ${cart.books.reduce((acc, item) => acc + item.bookId.price * item.quantity, 0).toFixed(2)}
              </div>
            </div>
            <div className={styles.bttondiv}>
              <button className={styles.buttonpayment} onClick={handlePayment}>
                Payment
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
