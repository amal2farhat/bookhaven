// ProductList.js
import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";

import DeleteIcon from "@mui/icons-material/Delete"; // Delete icon
// import Home from './Home'; // Import the UI component
import styles from "./categorylist.module.css";
// import 'bootstrap/dist/css/bootstrap.min.css';

export default function CategoryList() {
  const api = "http://localhost:3001";
  const [categories, setCategories] = useState([]);
  // const [products, setProducts] = useState([]);

  useEffect(() => {
    Axios.get(`${api}/bookcategories`)
      .then((res) => {
        setCategories(res.data);
        console.log(res.data);
      })
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  const deleteProduct = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (confirmDelete) {
      Axios.delete(`${api}/bookcategory/${id}`)
        .then((res) => {
          window.location.reload(); // Reload the entire page
          alert(`Product with ID ${id} deleted successfully.`);
        })
        .catch((err) => console.error("Error deleting product:", err));
    } else {
      alert("Product deletion canceled.");
    }
  };
  // const deleteProduct = (id) => {
  //   Axios.delete(`${api}/bookcategory/${id}`)
  //     .then((res) => alert(`Delete this product? `))
  //     .catch((err) => console.error("Error deleting products:", err));
  // };

  return (
    <div className={styles.all}>
      <div className={styles.result}>
        <div className={styles.margincustom}>
          <h2 className={styles.h2listcustom}>List of Categories</h2>
          <div className={styles.overcustom}>
            <table className={styles.customtable}>
              <thead>
                <tr>
                  <th className={styles.customtableth}>Name</th>

                  <th className={styles.customtablethaction}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category) => (
                  <tr key={category._id}>
                    <td className={styles.customtabletd}>{category.categoryName}</td>

                    <td className={styles.customtabletded}>
                      <Link
                        to={"/bookcategories/" + category._id}
                        //                     style={{ backgroundColor: '#f59e0b', color: '#ffffff',
                        //  border:'1px solid #f59e0b' , marginRight: '5px'
                        //  }}
                        className={styles.updatebtn}
                      >
                        Update
                      </Link>
                      {/* <Link onClick={() => deleteProduct(category._id)} className={styles.deletebtn}>
                      Delete2
                    </Link> */}
                      <Link className={styles.deletebtn} onClick={() => deleteProduct(category._id)}>
                        Delete
                      </Link>
                      {/* <button className={styles.deletebtn} onClick={() => deleteProduct(category._id)}>
                      Delete
                    </button> */}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

// export default ProductList;
