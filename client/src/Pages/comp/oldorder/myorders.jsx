import React, { useEffect, useMemo, useState } from "react";

import axios from "axios";
import { Pagination, Paper, Box, Typography, Grid } from "@mui/material";
// import styles from './categorylist.module.css';
// import { getAll } from "../../api/order.js";
import styles from "./myorders.module.css";

const MyOrders = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const api = "http://localhost:3001";
  const userId = localStorage.getItem("userId");

  const fetshOrders = async () => {
    const response = await axios.post(`${api}/userorders`, { userId });
    setData(response.data.data);
    console.log(response.data.data);
  };
  useEffect(() => {
    fetshOrders();
  }, []);

  return (
    <>
      <div>
        <h1 className={styles.customh1}>My Orders</h1>
        <div className={styles.result}>
          <table className={styles.customtable}>
            <thead>
              <tr>
                <th className={styles.customtableth}>Order ID</th>
                <th className={styles.customtableth}>Image</th>
                <th className={styles.customtableth}>Products</th>
                <th className={styles.customtableth}>Quantity</th>
                <th className={styles.customtableth}>Price</th>
                <th className={styles.customtableth}>Total</th> {/* New column for Total */}
                <th className={styles.customtableth}>Status</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((order) => {
                // Calculate the total for the current order
                // const total = order.books.reduce((sum, item) => {
                //   const price = item.product?.price || 0;
                //   const quantity = item.quantity || 0;
                //   return sum + price * quantity;
                // }, 0);

                return (
                  <tr className={styles.customtabletd} key={order._id}>
                    <td>{order._id}</td>
                    <td style={{ width: "100px" }}>
                      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                        {order.books.map((item, index) => (
                          <li>
                            <img
                              src={`${api}/${item.book?.image}`}
                              alt={item.book?.bookName}
                              className={styles.thumbnail}
                            />
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td style={{ width: "100px" }}>
                      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                        {order.books.map((item, index) => (
                          <li
                            key={`${order._id}-${index}`}
                            style={{ textDecoration: "none", width: "250px" }}
                          >
                            - {item.book ? item.book.bookName : "Unknown Book"}
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td style={{ width: "100px" }}>
                      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                        {order.books.map((item, index) => (
                          <li key={index} style={{ textDecoration: "none", width: "250px" }}>
                            pcs {item.quantity}
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td style={{ width: "100px" }}>
                      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                        {order.books.map((item, index) => (
                          <li key={index} style={{ textDecoration: "none", width: "250px" }}>
                            {item.book ? item.book.price.toFixed(2) : "N/A"}
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td style={{ width: "100px" }}></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );

  //     return (
  //       <div className={styles.result}>
  //   {data.length === 0 ? (
  //     <div>No orders found.</div>
  //   ) : (
  //     <table className={styles.customtable}>
  //       <thead>
  //         <tr>
  //           <th className={styles.customtableth}>Order ID</th>
  //           <th className={styles.customtableth}>Status</th>
  // {/*
  //           <th className={styles.customtableth}>City</th>
  //           <th className={styles.customtableth}>Address</th> */}
  //           <th className={styles.customtableth}>Products</th>
  //           <th className={styles.customtableth}>Quantity</th>
  //           <th className={styles.customtableth}>Price</th>
  //         </tr>
  //       </thead>
  //       <tbody>
  //         {data.map((order) => (
  //           <tr key={order._id}>
  //             <td className={styles.customtabletd}>{order._id}</td>
  //             <td className={styles.customtabletd}>{order.status}</td>

  //             {/* <td className={styles.customtabletd}>{order.shippingLocation.city}</td>
  //             <td className={styles.customtabletd}>{order.shippingLocation.address}</td> */}
  //             <td>
  //               {/* <table> */}
  //                 {/* <thead>
  //                   <tr>
  //                     <th>Product Name</th>
  //                     <th>Description</th>
  //                     <th>Price</th>
  //                     <th>Quantity</th>
  //                   </tr>
  //                 </thead> */}
  //                 {/* <tbody> */}
  //                   {order.products.map((item) => (
  //                     <tr key={item._id}>
  //                       <td>{item.product?.name }</td>
  //                       {/* <td>{item.product?.description || "Product Description Not Available"}</td> */}
  //                       <td>${item.product?.price ? item.product.price.toFixed(2) : "N/A"}</td>
  //                       <td>{item.quantity}</td>
  //                     </tr>
  //                   ))}
  //                 {/* </tbody> */}
  //               {/* </table> */}
  //             </td>
  //           </tr>
  //         ))}
  //       </tbody>
  //     </table>
  //   )}
  // </div>

  //         // <div>
  //         //   {data.length === 0 ? (
  //         //     <div>No orders found.</div>
  //         //   ) : (
  //         //     data.map((order) => (
  //         //       <div key={order._id}>
  //         //         <h3>Order ID: {order._id}</h3>
  //         //         <p>Status: {order.status}</p>
  //         //         <p>Payment Status: {order.payment ? "Paid" : "Pending"}</p>
  //         //         <h4>Shipping Location</h4>
  //         //         <p>City: {order.shippingLocation.city}</p>
  //         //         <p>Address: {order.shippingLocation.address}</p>
  //         //         <h4>Products</h4>
  //         //         <ul>
  //         //         {order.products.map((item) => (
  //         //         <li key={item._id}>
  //         //           <h5>{item.product?.name || "Product Name Not Available"}</h5>
  //         //           <p>{item.product?.description || "Product Description Not Available"}</p>
  //         //           <p>Price: ${item.product?.price ? item.product.price.toFixed(2) : "N/A"}</p>
  //         //           <p>Quantity: {item.quantity}</p>
  //         //         </li>
  //         //       ))}
  //         //           {/* {order.products.map((item) => (
  //         //             <li key={item._id}>
  //         //               <h5>{item.product.name}</h5>
  //         //               <p>{item.product.description}</p>
  //         //               <p>Price: ${item.product.price.toFixed(2)}</p>
  //         //               <p>Quantity: {item.quantity}</p>
  //         //             </li>
  //         //           ))} */}
  //         //         </ul>
  //         //       </div>
  //         //     ))
  //         //   )}
  //         // </div>
  //       );
};

export default MyOrders;
// const MyOrders = () => {
//     const [orders, setOrders] = useState([]);
// //   const [orders, setOrders] = useState(null);
//   const [error, setError] = useState(null);

//   useMemo(() => {
//     const getOrders = async () => {
//       try {
//         const res = await order.getAll();
//         console.log("API Response:", res);

//         if (Array.isArray(res)) {
//           setOrders(res.slice(0, 5));
//         } else {
//           setError("Invalid response format from categories API");
//         }
//       } catch (error) {
//         setError("Error fetching categories");
//         console.error(error);
//       }
//     };

//     getOrders();
//   }, []);

// //   useMemo(() => {
// //     // Clear previous errors
// //     setError(null);

// //     // Fetch orders
// //     order
// //       .getAll()
// //       .then((response) => setOrders(response))
// //       .catch((error) => setError(error));
// //   }, []); // Empty dependency array means this effect runs only once when component mounts

//   if (error) {
//     return <div>Error: {error.message}</div>;
//   }

//   return (
//     <div>
//       {orders ? (
//         <ul>
//           {orders.map((order) => (
//             <li key={order.id}>{order.name}</li> // Adjust properties based on your order data structure
//           ))}
//         </ul>
//       ) : (
//         <div>Loading...</div>
//       )}
//     </div>
//   );
// };

// export default MyOrders;

// <tbody>
// {data.map((order) =>
//   order.products.map((item) => (
//     <tr  style={{ borderBottom: '2px solid #e2e8f0' }} key={`${order._id}-${item._id}`}>
//       {/* Order Details */}
//       {item === order.products[0] && (
//         <>
//           <td className={styles.customtabletd} rowSpan={order.products.length}>{order._id}</td>

//           <td className={styles.customtabletd} rowSpan={order.products.length}>
//             {order.payment ? "Paid" : "Pending"}
//           </td>

//         </>
//       )}
//       {/* Product Details */}
//       <td >{item.product?.name || "Product Name Not Available"}</td>

//       <td >{item.quantity}</td>
//       <td >${item.product?.price ? item.product.price.toFixed(2) : "N/A"}</td>

//     </tr>

//   ))
// )}
// </tbody>
