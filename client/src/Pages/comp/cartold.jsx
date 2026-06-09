// return (
//   <div className={styles.allcontainer}>
//     <div className={styles.shoppingcart}>
//       <div className={styles.title}>Shopping Cart</div>

//       <div className={styles.itemheader}>
//         <div className={styles.ac}>Action</div>
//         <div className={styles.im}>Image</div>
//         <div className={styles.desc}>Book Name</div>
//         <div className={styles.qu}>Quantity</div>
//         <div className={styles.pr}>Price</div>
//         <div className={styles.tot}>Total</div>
//       </div>

//       {cart.books.map((item) => {
//         return (
//           <div className={styles.item} key={item.bookId._id}>
//             <div className={styles.buttons}>
//               {/* <button className="prdct-delete" onClick={() => handleDecrement(data.id)}>
//           <i className="fa fa-trash-alt"></i>
//         </button> */}
//               <DeleteIcon className={styles.delicon} onClick={() => handleDeletecart(item.bookId._id)} />
//               {/* <DeleteIcon className={styles.delicon} onClick={handleDeletecart} /> */}
//             </div>
//             {/*    <div style={{width:"20px" , height:"20px"}}> */}
//             <div className={styles.imagee}>
//               <img src={`${api}/${item.bookId.image}`} alt={item.bookId.bookName} />
//             </div>

//             <div className={styles.description}>
//               <span>{item.bookId.bookName}</span>
//             </div>

//             <div className={styles.quantity}>
//               <button
//                 className={styles.plusbtn}
//                 onClick={() => updateQuantity(item.bookId._id, item.quantity + 1)}
//                 type="button"
//               >
//                 +
//               </button>
//               <input className={styles.inputt} type="text" name="quantity" value={item.quantity} />
//               <button
//                 className={styles.minusbtn}
//                 onClick={() => updateQuantity(item.bookId._id, item.quantity - 1)}
//                 disabled={item.quantity <= 1}
//                 type="button"
//               >
//                 -
//               </button>
//             </div>

//             <div className={styles.totalprice}>${item.bookId.price}</div>
//             <div className={styles.totalprice}>${item.bookId.price * item.quantity}</div>
//           </div>
//         );
//       })}
//       <div className={styles.divtotal}>
//         <div className={styles.sumt}>Total Price:</div>
//         <div className={styles.sumtotal}>
//           {" "}
//           ${cart.books.reduce((acc, item) => acc + item.bookId.price * item.quantity, 0).toFixed(2)}
//         </div>
//       </div>
//       <div className={styles.bttondiv}>
//         <button
//           className={styles.buttonpayment}
//           // style={{ display: "flex", alignItems: "center" }}
//           onClick={handlePayment}
//         >
//           Payment
//         </button>
//         {/* <button onClick={handlePayment}>payment</button>{" "} */}
//       </div>
//     </div>
//   </div>

//   //    <div className={styles.shoppingcart}>

//   //       <div className={styles.title}>
//   //         Shopping Cart
//   //       </div>

//   //   <div className={styles.item}>
//   //   {cart.books.map(item => (
//   //     < >
//   //      {/* <div key={item.bookId._id}> */}
//   //         <div className={styles.buttons}>
//   //           <span className={styles.deletebtn}></span>
//   //           <span className={styles.likebtn}></span>
//   //         </div>

//   //         <div className={styles.imagee} key={item.bookId._id} >
//   //         <img
//   //              src={`${api}/${item.bookId.image}`} alt=""
//   //           ></img>

//   //         </div>

//   //         <div className={styles.description}>
//   //           <span>{item.bookId.bookName}</span>
//   //           {/* <span>Bball High</span>
//   //           <span>White</span> */}
//   //         </div>

//   //         <div className={styles.quantity}>
//   //           <button className={styles.plusbtn} onClick={() => updateQuantity(item.bookId._id, item.quantity + 1)} type="button" name="button">
//   //             +
//   //             {/* <img src="plus.svg" alt="" /> */}
//   //           </button>
//   //           <input className={styles.inputt}
//   //       type="text"
//   //       name="name"
//   //       // value={name}
//   //       // onChange={handleChange}
//   //     />
//   //           {item.quantity}
//   //           <button className={styles.minusbtn}  onClick={() => updateQuantity(item.bookId._id, item.quantity - 1)} disabled={item.quantity <= 1}
//   //            type="button" name="button">-
//   //             {/* <img src="minus.svg" alt="" /> */}
//   //           </button>
//   //         </div>

//   //            <div className={styles.totalprice} >$549</div>
//   //            </>
//   //             ))}

//   // {/* <button onClick={handlePayment}>payment</button> */}
//   //       </div>
//   //  </div>

//   //   <div style={{ marginTop: "100px" }}>
//   //  <div>
//   //  <h2>Your Cart</h2>
//   //   <ul>
//   //     {cart.books.map(item => (
//   //       <li key={item.bookId._id}>
//   //         {item.bookId.bookName} - Quantity: {item.quantity}
//   //         <button onClick={() => updateQuantity(item.bookId._id, item.quantity - 1)} disabled={item.quantity <= 1}>-</button>
//   //         <button onClick={() => updateQuantity(item.bookId._id, item.quantity + 1)}>+</button>
//   //       </li>
//   //     ))}
//   //   </ul>
//   //  </div>
//   //  <button onClick={handlePayment}>payment</button>

//   // </div>
// );
//
// return (
//     <div style={{marginTop:"100px"}}>
//         <h2>Your Cart</h2>
//         <ul>
//             {cart.books.map(item => (
//                 <li key={item.bookId._id}>
//                     {item.bookId.bookName} - Quantity: {item.quantity}
//                 </li>
//             ))}
//         </ul>
//     </div>
// );
