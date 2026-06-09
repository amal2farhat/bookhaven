import axios from "axios";
import React, { useEffect, useState } from "react";
import styles from "./OrdersPage3.module.css"; // Import pure CSS
import { useNavigate } from "react-router-dom"; // Add this for navigation
import emptyOrderImage from "../../../src/assets/order/order6.png";
// import emptyOrderImage from "../../../src/assets/order/order2.jpg";

// Theme Switcher Component (Dark/Light Mode)
// const Themed = ({ children }) => {
// useEffect(() => {
//   const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
//   document.documentElement.setAttribute("data-theme", prefersDark ? "dark" : "light");
// }, []);

//   return <>{children}</>;
// };

const OrdersPage3 = () => {
  const [data, setData] = useState([]); // Orders data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [page, setPage] = useState(1); // Current page (starts at page 1)
  const ordersPerPage = 6; // Number of orders per page

  const api = "http://localhost:3001"; // API endpoint
  const navigate = useNavigate(); // Use history for navigation
  const userId = localStorage.getItem("userId");

  const fetchOrders = async () => {
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        // alert("please login");
        navigate("/signin");
      }
      const response = await axios.post(
        `${api}/userorders`,
        { userId },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setData(response.data.data); // Set fetched orders data
      setLoading(false); // Set loading to false after data is fetched
    } catch (err) {
      setError(err); // Handle any errors from the API call
      setLoading(false); // Set loading to false in case of error
    }
  };

  useEffect(() => {
    fetchOrders(); // Fetch orders when the component mounts
  }, []);

  // Handle page change in pagination
  const handlePageChange = (value) => {
    setPage(value); // Update the current page
  };

  // Slice the data to display only orders for the current page
  const paginatedOrders = data.slice((page - 1) * ordersPerPage, page * ordersPerPage);

  // if (loading) {
  //   return <div>Loading...</div>;
  // }
  // if (!data)
  //   return (
  //     <>
  //       <div className={styles.title}>{/* User Shopping Cart :{userId} {userName}{" "} */}</div>
  //       <div className={styles.emptyCart}>
  //         <p className={styles.emptyCart}>Your Cart is Empty.</p>
  //         <img src={emptyCartImage} alt="Empty Cart" style={{ width: "600px", height: "600px" }} />
  //       </div>
  //     </>
  //   );
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      {/* <Themed> */}
      <div className={styles.ordersPage}>
        {/* Pagination */}
        <div className={styles.pagination}>
          {[...Array(Math.ceil(data.length / ordersPerPage))].map((_, index) => (
            <button
              key={index}
              className={page === index + 1 ? styles.activePage : styles.pageButton}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>

        {/* Conditional rendering based on orders */}
        {paginatedOrders.length === 0 ? (
          <>
            <div className={styles.title}>{/* User Shopping Cart :{userId} {userName}{" "} */}</div>
            <div className={styles.emptyOrder}>
              <p className={styles.emptyOrder}>No orders found!.</p>
              <div className={styles.noOrders}>
                <img src={emptyOrderImage} alt="No Orders" style={{ width: "600px", height: "600px" }} />
              </div>
            </div>
          </>
        ) : (
          <>
            <h1 className={styles.title}>Orders</h1>
            <div className={styles.gridContainer}>
              {paginatedOrders.map((order) => (
                <div className={styles.orderCard} key={order._id}>
                  <div className={styles.cardHeader}>
                    <span className={styles.orderId}>Order ID: {order._id}</span>
                    <span
                      className={`${styles.orderStatus} ${
                        order.orderStatus === "Pending"
                          ? styles.pending
                          : order.orderStatus === "Delivered"
                          ? styles.delivered
                          : ""
                      }`}
                    >
                      Status: {order.orderStatus}
                    </span>
                  </div>

                  <div className={styles.booktList}>
                    <h3 className={styles.sectionTitle}>Books:</h3>
                    <ul>
                      {order.books?.map((item, index) => (
                        <li key={`${order._id}-${index}`}>
                          <img
                            src={`${api}/${item.book?.image}`}
                            alt={item.book?.bookName}
                            className={styles.imgthumbnail}
                          />
                          {item.book ? item.book.bookName : "Unknown Book"} (x{item.quantity}) =&gt; ${" "}
                          {item.book?.price
                            ? (item.quantity * item.book?.price).toFixed(2) // Calculate total price
                            : "N/A"}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className={styles.pricing}>
                    <h3 className={styles.sectionTitle}>Total:</h3>
                    <span className={styles.totalPrice}>
                      $
                      {order.books
                        .reduce((total, item) => {
                          const price = item.book?.price || 0;
                          return total + item.quantity * price;
                        }, 0)
                        .toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
      {/* </Themed> */}
    </>
  );
};

export default OrdersPage3;
