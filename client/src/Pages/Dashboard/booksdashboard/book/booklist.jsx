// ProductList.js
import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";

import DeleteIcon from "@mui/icons-material/Delete"; // Delete icon
// import Home from './Home'; // Import the UI component
import styles from "./booklist.module.css";
// import 'bootstrap/dist/css/bootstrap.min.css';

export default function BookList() {
  const api = "http://localhost:3001";
  const [books, setBooks] = useState([]);

  useEffect(() => {
    Axios.get(`${api}/allbooks`)
      .then((res) => {
        setBooks(res.data);
        console.log(res.data);
      })
      .catch((err) => console.error("Error fetching book:", err));
  }, []);

  const deleteBook = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this book?");
    if (confirmDelete) {
      Axios.delete(`${api}/deletebook/${id}`)
        .then((res) => {
          window.location.reload(); // Reload the entire page
          alert(`Product with ID ${id} deleted successfully.`);
        })
        .catch((err) => console.error("Error deleting book:", err));
    } else {
      alert("Book deletion canceled.");
    }
  };

  return (
    <div className={styles.all}>
      <div className={styles.result}>
        <div className={styles.margincustom}>
          <h2 className={styles.h2listcustom}>List of Books</h2>
          <div className={styles.overcustom}>
            <table className={styles.customtable}>
              <thead>
                <tr>
                  <th className={styles.customtableth}>Image</th>
                  <th className={styles.customtableth}>Name</th>

                  <th className={styles.customtableth}>Author</th>
                  <th className={styles.customtableth}>Description</th>
                  <th className={styles.customtableth}>Category</th>
                  <th className={styles.customtableth}>Quantity</th>
                  <th className={styles.customtableth}>Price</th>

                  <th className={styles.customtableth}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {books.map((book) => (
                  <tr key={book._id}>
                    <td className={styles.customtabletd}>
                      {book.image && book.image.length > 0 && (
                        <img
                          //  src={`http://localhost:5000/api/${category.image}`}
                          src={`${api}/${book.image}`} // Display the first image in the array
                          alt={book.name}
                          className={styles.thumbnail} // Ensure this class is styled correctly in categorypage.module.css
                        />
                      )}
                      {/*       
                    {category.images && category.images.map((photo, index) => (
                      <img
                        key={index}
                        src={`${api}/${photo}`}
                        alt={`${category.name}-${index}`}
                        className={styles.thumbnail}
                      />
                    ))} */}
                    </td>
                    <td className={styles.customtabletd}>{book.bookName}</td>

                    <td className={styles.customtabletd}>{book.author}</td>
                    {/* <td className={styles.customtabletd}>{book.description}</td> */}
                    <td>
                      {" "}
                      {book.description.length > 50
                        ? `${book.description.slice(0, 50)}...`
                        : book.description}
                    </td>

                    <td className={styles.customtabletd}>
                      {book.categories ? book.categories.categoryName : "No Category"}
                      {/* {book.categories.map((category) => category.categoryName).join(", ")} */}
                      {/* .join(", ") : la nofssol l3anasser bi fassli w faragh */}
                      {/* {book.categories} */}
                    </td>
                    <td className={styles.customtabletdq}>{book.bookCountAvailable}</td>
                    <td className={styles.customtabletd}>{book.price}</td>
                    <td className={styles.customtabletd}>
                      <Link
                        to={"/updatebook/" + book._id}
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
                      <Link className={styles.deletebtn} onClick={() => deleteBook(book._id)}>
                        Delete
                      </Link>
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
