import axios from "axios";
import React, { useEffect, useState } from "react";
import { Grid, Paper, Box, Typography, Pagination, useMediaQuery } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import styles from "./OrdersPage.module.css";

// Themed component to provide a dark/light theme
const Themed = ({ children }) => {
  const dark = useMediaQuery("(prefers-color-scheme: dark)");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
  }, [dark]);

  return (
    <ThemeProvider
      theme={createTheme({
        palette: {
          mode: dark ? "dark" : "light",
        },
      })}
    >
      {children}
    </ThemeProvider>
  );
};

const OrdersPage = () => {
  const [data, setData] = useState([]); // Orders data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [page, setPage] = useState(1); // Current page (starts at page 1)
  const ordersPerPage = 6; // Number of orders per page

  const api = "http://localhost:3001"; // API endpoint
  const userId = localStorage.getItem("userId");

  const fetchOrders = async () => {
    try {
      const response = await axios.post(`${api}/userorders`, { userId });
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
  const handlePageChange = (event, value) => {
    setPage(value); // Update the current page
  };

  // Slice the data to display only orders for the current page
  const paginatedOrders = data.slice((page - 1) * ordersPerPage, page * ordersPerPage);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <Themed>
      <div className={styles.ordersPage}>
        <h1 className={styles.title}>My Orders</h1>

        {/* Pagination */}
        <Pagination
          count={Math.ceil(data.length / ordersPerPage)} // Total pages (based on the total data length)
          page={page} // Current page
          onChange={handlePageChange} // Handle page change
          color="secondary"
          variant="outlined"
          size="large"
          className={styles.pagination}
        />

        <Grid container spacing={4} className={styles.gridContainer}>
          {paginatedOrders.map((order) => (
            <Grid item xs={12} md={6} lg={4} key={order._id}>
              <Paper className={styles.orderCard}>
                <Box className={styles.cardHeader}>
                  <Typography variant="h6" className={styles.orderId}>
                    Order ID: {order._id}
                  </Typography>
                  <Typography variant="subtitle1" className={styles.orderStatus}>
                    Status: {order.status}
                  </Typography>
                </Box>

                <Box className={styles.productList}>
                  <Typography variant="body1" className={styles.sectionTitle}>
                    Products:
                  </Typography>
                  <ul>
                    {order.books?.map((item, index) => (
                      <li key={`${order._id}-${index}`}>{item.book ? item.book.bookName : "Unknown Book"}</li>
                    ))}
                  </ul>
                </Box>

                <Box className={styles.pricing}>
                  <Typography variant="body1" className={styles.sectionTitle}>
                    Total:
                  </Typography>
                  <Typography variant="h6" className={styles.totalPrice}>
                    $ price
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </div>
    </Themed>
  );
};

export default OrdersPage;
