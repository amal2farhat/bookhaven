import React, { useEffect, useState } from "react";
import Axios from "axios";

import { loadStripe } from "@stripe/stripe-js";
// import styles from  './cart.module.css';
import styles from "./cartnew.module.css";

const stripePromise = loadStripe(
  "pk_test_51Kn6ZnGvzR6AvazOEvfdZgPwzEbaXY0ebaZ3n6W99nJsMdPJBxlMRVNY0VDjvc2Itr0vjhROpxNRwTQ0E6s8koRk00CgX7v1nd",
); // Replace with your Stripe publishable key

const CartNew = () => {
  const [cart, setCart] = useState(null);
  const api = "http://localhost:3001";

  useEffect(() => {
    const fetchCart = async () => {
      const userId = localStorage.getItem("userId");
      try {
        const response = await Axios.get(`${api}/cart/${userId}`);
        setCart(response.data);
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
 
  const handlePayment = async () => {
    const userId = localStorage.getItem("userId");
    try {
      // const email = "example@domain.com"; // Replace with actual user email
      // const _id = "6698fbc2c133f8cbea516665";
      // Make a request to your backend to create a Checkout Session
      const response = await Axios.post(`${api}/create-checkout-session`, { userId });

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



  if (!cart) return <div>Loading...</div>;
  return (
    <>
      <div className="row justify-content-center m-0">
        <div className="col-md-8 mt-5 mb-5 cardsdetails">
          <div className="card">
            <div className="card-header bg-dark p-3">
              <div className="card-header-flex">
                <h5 className="text-white m-0">
                  Cart Calculation{cart.length > 0 ? `(${cart.length})` : ""}
                </h5>
                {/* {
                              cart.length > 0 ? <button className='btn btn-danger mt-0 btn-sm'
                                  // onClick={emptycart}
                              ><i className='fa fa-trash-alt mr-2'></i><span>EmptyCart</span></button>
                                  : ""
                          } */}
              </div>
            </div>
            <div className="card-body p-0">
              {/* {
                          cart.length === 0 ?  */}
              <table className="table cart-table mb-0">
                <tbody>
                  <tr>
                    <td colSpan={6}>
                      <div className="cart-empty">
                        <i className="fa fa-shopping-cart"></i>
                        <p>Your Cart Is Empty</p>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>{" "}
              :
              <table className="table cart-table mb-0 table-responsive-sm">
                <thead>
                  <tr>
                    <th>Action</th>
                    <th>Product</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Qty</th>
                    <th className="text-right">
                      {" "}
                      <span id="amount" className="amount">
                        Total Amount
                      </span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {/* {
                                        // cart.books.map(item => (
                                          cart.map((data, index) => { */}
                  return (
                  <>
                    <tr>
                      <td>
                        <button
                          className="prdct-delete"
                          // onClick={() => handleDecrement(data.id)}
                        >
                          <i className="fa fa-trash-alt"></i>
                        </button>
                      </td>
                      <td>
                        <div className="product-img">
                          <img src="" alt="ll" />
                        </div>
                      </td>
                      <td>
                        <div className="product-name">
                          <p>data</p>
                        </div>
                      </td>
                      <td>pricce</td>
                      <td>
                        <div className="prdct-qty-container">
                          <button
                            className="prdct-qty-btn"
                            type="button"
                            // onClick={data.qnty <= 1 ? () => handleDecrement(data.id) : () => handleSingleDecrement(data)}
                          >
                            <i className="fa fa-minus"></i>
                          </button>
                          <input type="text" className="qty-input-box" value="qty" disabled name="" id="" />
                          <button
                            className="prdct-qty-btn"
                            type="button"
                            //  onClick={() => handleIncrement(data)}
                          >
                            <i className="fa fa-plus"></i>
                          </button>
                        </div>
                      </td>
                      <td className="text-right">₹ data.qnty * data.price</td>
                    </tr>
                  </>
                  )
                  {/* //     })
                                      // } */}
                </tbody>
                <tfoot>
                  <tr>
                    <th>&nbsp;</th>
                    <th colSpan={2}>&nbsp;</th>
                    <th>
                      Items In Cart <span className="ml-2 mr-2">:</span>
                      <span className="text-danger">{/* {totalquantity} */} TotalQ</span>
                    </th>
                    <th className="text-right">
                      Total Price<span className="ml-2 mr-2">:</span>
                      <span className="text-danger">₹ totalprice</span>
                    </th>
                    <th className="text-right">
                      <button
                        className="btn btn-success"
                        //  onClick={makePayment}
                        type="submit"
                      >
                        Checkout
                      </button>
                    </th>
                  </tr>
                </tfoot>
              </table>
              {/* } */}
            </div>
          </div>
        </div>
      </div>
    </>
   };

export default CartNew;
