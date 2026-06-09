// import React, { useEffect, useState } from "react";
// import Axios from "axios";

// import { loadStripe } from "@stripe/stripe-js";
// // import styles from  './cart.module.css';
// import styles from "./cartnew.module.css";

// const stripePromise = loadStripe(
//   "pk_test_51Kn6ZnGvzR6AvazOEvfdZgPwzEbaXY0ebaZ3n6W99nJsMdPJBxlMRVNY0VDjvc2Itr0vjhROpxNRwTQ0E6s8koRk00CgX7v1nd"
// ); // Replace with your Stripe publishable key

// const CartNew = () => {
//   const [cart, setCart] = useState(null);
//   const api = "http://localhost:3001";

//   useEffect(() => {
//     const fetchCart = async () => {
//       const userId = localStorage.getItem("userId");
//       try {
//         const response = await Axios.get(`${api}/cart/${userId}`);
//         setCart(response.data);
//       } catch (error) {
//         console.error("Error fetching cart:", error);
//       }
//     };

//     fetchCart();
//   }, []);

//   const updateQuantity = async (bookId, quantity) => {
//     const userId = localStorage.getItem("userId");
//     try {
//       await Axios.put(`${api}/updatecart`, { userId, bookId, quantity });
//       // Update the local state only after a successful update
//       const updatedCart = cart.books.map((item) =>
//         item.bookId._id === bookId ? { ...item, quantity } : item
//       );
//       setCart({ ...cart, books: updatedCart });
//     } catch (error) {
//       console.error("Error updating cart:", error);
//     }
//   };
//   //   const handleCheckout = async () => {
//   //     const userId = localStorage.getItem('userId');
//   //     try {
//   //         const response = await Axios.post('http://localhost:3001/create-checkout-session', {userId}
//   //             // userId: '66e49d237337e78f67f5e718', // Replace with actual user ID
//   //         );

//   //         const sessionId = response.data.id;

//   //         // Redirect to Stripe Checkout
//   //         const stripe = await stripePromise;
//   //         // const stripe = await loadStripe('your_stripe_public_key_here'); // Replace with your actual public key
//   //         await stripe.redirectToCheckout({ sessionId });
//   //     } catch (error) {
//   //         console.error('Error creating checkout session:', error);
//   //     }
//   // };
//   const handlePayment = async () => {
//     const userId = localStorage.getItem("userId");
//     try {
//       // const email = "example@domain.com"; // Replace with actual user email
//       // const _id = "6698fbc2c133f8cbea516665";
//       // Make a request to your backend to create a Checkout Session
//       const response = await Axios.post(`${api}/create-checkout-session`, { userId });

//       const { id } = response.data;
//       const stripe = await stripePromise;

//       // Redirect to Checkout
//       const { error } = await stripe.redirectToCheckout({ sessionId: id });
//       if (error) {
//         console.error("Error during checkout:", error);
//       }
//     } catch (error) {
//       console.error("Error during checkout:", error);
//     }
//   };

//   // const updateQuantity = async (bookId, quantity) => {
//   //     const userId = localStorage.getItem('userId');
//   //     try {
//   //       await Axios.put(`${api}/updatecart`, { userId, bookId, quantity });
//   //       const updatedCart = cart.books.map(item =>
//   //         item.bookId._id === bookId ? { ...item, quantity } : item
//   //       );
//   //       setCart({ ...cart, books: updatedCart });
//   //     } catch (error) {
//   //       console.error("Error updating cart:", error);
//   //     }
//   //   };

//   if (!cart) return <div>Loading...</div>;
//   return (
//     <>
//       <div className="row justify-content-center m-0">
//         <div className="col-md-8 mt-5 mb-5 cardsdetails">
//           <div className="card">
//             <div className="card-header bg-dark p-3">
//               <div className="card-header-flex">
//                 <h5 className="text-white m-0">
//                   Cart Calculation{cart.length > 0 ? `(${cart.length})` : ""}
//                 </h5>
//                 {/* {
//                               cart.length > 0 ? <button className='btn btn-danger mt-0 btn-sm'
//                                   // onClick={emptycart}
//                               ><i className='fa fa-trash-alt mr-2'></i><span>EmptyCart</span></button>
//                                   : ""
//                           } */}
//               </div>
//             </div>
//             <div className="card-body p-0">
//               {/* {
//                           cart.length === 0 ?  */}
//               <table className="table cart-table mb-0">
//                 <tbody>
//                   <tr>
//                     <td colSpan={6}>
//                       <div className="cart-empty">
//                         <i className="fa fa-shopping-cart"></i>
//                         <p>Your Cart Is Empty</p>
//                       </div>
//                     </td>
//                   </tr>
//                 </tbody>
//               </table>{" "}
//               :
//               <table className="table cart-table mb-0 table-responsive-sm">
//                 <thead>
//                   <tr>
//                     <th>Action</th>
//                     <th>Product</th>
//                     <th>Name</th>
//                     <th>Price</th>
//                     <th>Qty</th>
//                     <th className="text-right">
//                       {" "}
//                       <span id="amount" className="amount">
//                         Total Amount
//                       </span>
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {/* {
//                                         // cart.books.map(item => (
//                                           cart.map((data, index) => { */}
//                   return (
//                   <>
//                     <tr>
//                       <td>
//                         <button
//                           className="prdct-delete"
//                           // onClick={() => handleDecrement(data.id)}
//                         >
//                           <i className="fa fa-trash-alt"></i>
//                         </button>
//                       </td>
//                       <td>
//                         <div className="product-img">
//                           <img src="" alt="ll" />
//                         </div>
//                       </td>
//                       <td>
//                         <div className="product-name">
//                           <p>data</p>
//                         </div>
//                       </td>
//                       <td>pricce</td>
//                       <td>
//                         <div className="prdct-qty-container">
//                           <button
//                             className="prdct-qty-btn"
//                             type="button"
//                             // onClick={data.qnty <= 1 ? () => handleDecrement(data.id) : () => handleSingleDecrement(data)}
//                           >
//                             <i className="fa fa-minus"></i>
//                           </button>
//                           <input type="text" className="qty-input-box" value="qty" disabled name="" id="" />
//                           <button
//                             className="prdct-qty-btn"
//                             type="button"
//                             //  onClick={() => handleIncrement(data)}
//                           >
//                             <i className="fa fa-plus"></i>
//                           </button>
//                         </div>
//                       </td>
//                       <td className="text-right">₹ data.qnty * data.price</td>
//                     </tr>
//                   </>
//                   )
//                   {/* //     })
//                                       // } */}
//                 </tbody>
//                 <tfoot>
//                   <tr>
//                     <th>&nbsp;</th>
//                     <th colSpan={2}>&nbsp;</th>
//                     <th>
//                       Items In Cart <span className="ml-2 mr-2">:</span>
//                       <span className="text-danger">{/* {totalquantity} */} TotalQ</span>
//                     </th>
//                     <th className="text-right">
//                       Total Price<span className="ml-2 mr-2">:</span>
//                       <span className="text-danger">₹ totalprice</span>
//                     </th>
//                     <th className="text-right">
//                       <button
//                         className="btn btn-success"
//                         //  onClick={makePayment}
//                         type="submit"
//                       >
//                         Checkout
//                       </button>
//                     </th>
//                   </tr>
//                 </tfoot>
//               </table>
//               {/* } */}
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//     //       <div className={styles.shoppingcart}>
//     //   <div className={styles.title}>Shopping Cart</div>
//     //   {cart.books.map(item => (
//     //     <div className={styles.item} key={item.bookId._id}>
//     //       <div className={styles.buttons}>
//     //         <span className={styles.deletebtn}></span>
//     //         <span className={styles.likebtn}></span>
//     //       </div>
//     // {/*    <div style={{width:"20px" , height:"20px"}}> */}
//     //       <div className={styles.imagee}>
//     //         <img src={`${api}/${item.bookId.image}`} alt={item.bookId.bookName} />
//     //       </div>

//     //       <div className={styles.description}>
//     //         <span>{item.bookId.bookName}</span>
//     //       </div>

//     //       <div className={styles.quantity}>
//     //         <button className={styles.plusbtn} onClick={() => updateQuantity(item.bookId._id, item.quantity + 1)} type="button">+</button>
//     //         <input className={styles.inputt} type="text" name="quantity" value={item.quantity} readOnly />
//     //         <button className={styles.minusbtn} onClick={() => updateQuantity(item.bookId._id, item.quantity - 1)} disabled={item.quantity <= 1} type="button">-</button>
//     //       </div>

//     //       <div className={styles.totalprice}>${item.price}</div>
//     //     </div>
//     //   ))}
//     // </div>

//     //    <div className={styles.shoppingcart}>

//     //       <div className={styles.title}>
//     //         Shopping Cart
//     //       </div>

//     //   <div className={styles.item}>
//     //   {cart.books.map(item => (
//     //     < >
//     //      {/* <div key={item.bookId._id}> */}
//     //         <div className={styles.buttons}>
//     //           <span className={styles.deletebtn}></span>
//     //           <span className={styles.likebtn}></span>
//     //         </div>

//     //         <div className={styles.imagee} key={item.bookId._id} >
//     //         <img
//     //              src={`${api}/${item.bookId.image}`} alt=""
//     //           ></img>

//     //         </div>

//     //         <div className={styles.description}>
//     //           <span>{item.bookId.bookName}</span>
//     //           {/* <span>Bball High</span>
//     //           <span>White</span> */}
//     //         </div>

//     //         <div className={styles.quantity}>
//     //           <button className={styles.plusbtn} onClick={() => updateQuantity(item.bookId._id, item.quantity + 1)} type="button" name="button">
//     //             +
//     //             {/* <img src="plus.svg" alt="" /> */}
//     //           </button>
//     //           <input className={styles.inputt}
//     //       type="text"
//     //       name="name"
//     //       // value={name}
//     //       // onChange={handleChange}
//     //     />
//     //           {item.quantity}
//     //           <button className={styles.minusbtn}  onClick={() => updateQuantity(item.bookId._id, item.quantity - 1)} disabled={item.quantity <= 1}
//     //            type="button" name="button">-
//     //             {/* <img src="minus.svg" alt="" /> */}
//     //           </button>
//     //         </div>

//     //            <div className={styles.totalprice} >$549</div>
//     //            </>
//     //             ))}

//     // {/* <button onClick={handlePayment}>payment</button> */}
//     //       </div>
//     //  </div>

//     //   <div style={{ marginTop: "100px" }}>
//     //  <div>
//     //  <h2>Your Cart</h2>
//     //   <ul>
//     //     {cart.books.map(item => (
//     //       <li key={item.bookId._id}>
//     //         {item.bookId.bookName} - Quantity: {item.quantity}
//     //         <button onClick={() => updateQuantity(item.bookId._id, item.quantity - 1)} disabled={item.quantity <= 1}>-</button>
//     //         <button onClick={() => updateQuantity(item.bookId._id, item.quantity + 1)}>+</button>
//     //       </li>
//     //     ))}
//     //   </ul>
//     //  </div>
//     //  <button onClick={handlePayment}>payment</button>

//     // </div>
//   );

//   // return (
//   //     <div style={{marginTop:"100px"}}>
//   //         <h2>Your Cart</h2>
//   //         <ul>
//   //             {cart.books.map(item => (
//   //                 <li key={item.bookId._id}>
//   //                     {item.bookId.bookName} - Quantity: {item.quantity}
//   //                 </li>
//   //             ))}
//   //         </ul>
//   //     </div>
//   // );
// };

// export default CartNew;
