import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { useParams } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import styles from './bookdetails.module.css';
import { useNavigate } from "react-router-dom"; 

// import './bookdetails.css'

const BookDetails = () => {
  const { id } = useParams(); // Get the book ID from the URL
  const [book, setBook] = useState(null); // State to hold the book details
  const [loading, setLoading] = useState(true); // State to manage loading
  const [quantity, setQuantity] = useState(1); 
  const api = "http://localhost:3001";
 const navigate = useNavigate();
  useEffect(() => {
    const fetchBookData = async () => {
      try {
        // const response = await Axios.get(`${api}/getbook/${id}`);
        const response = await Axios.get(`${api}/getdetailsbook/${id}`);
        const bookData = response.data;
        setBook(bookData); // Set the fetched book data to state
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false); // Set loading to false once the fetch is done
      }
    };

    fetchBookData();
  }, [id]); // Dependency array includes id to refetch if it changes

  const handleAddToCart = async () => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      // setIsLoggedIn(false);
      // alert("Please log in to view your cart.");
      navigate("/signin");
    }
    try {
        const response = await Axios.post(`${api}/addcart`, {
            userId,
            bookId:id,
            quantity: 1 // Or get this from user input
        });
        alert("Book added to cart!");
        console.log(response.data);
    } catch (error) {
        console.error("Error adding book to cart:", error);
        alert("Failed to add book to cart.");
    }
};

const incrementQuantity = () => setQuantity(quantity + 1);
const decrementQuantity = () => setQuantity(quantity > 1 ? quantity - 1 : 1); // Prevent going below 1

  if (loading) {
    return <div>Loading...</div>; // Loading state
  }

  if (!book) {
    return <div>No book found!</div>; // Handle case where book is not found
  }

  return (
   <div className={styles.containers}  key={book._id}>
     <div className={styles.bookdetails}>
          <div className={styles.bookcontainer}>
                <div className={styles.bookcovers} >
                    {/* <div class="book-cover"> */}
                    {book.image && <img src={`${api}/${book.image}`} alt={book.bookName} class="book-cover-img"/>}

                </div>
          </div>
        <div className={styles.bookinfo} >
         <h2  id="book-title">{book.bookName}</h2>
         <h4 id="book-author" class="text-muted">Autor : {book.author}</h4>
            <p id="category"><span className={styles.boldtext} style={{fontWeight: "bold"}}>
           Category:</span> {book.categories ? book.categories.categoryName : "No Category"}</p>
               {/* <p id="available-${index}" class="${book.available === 'available' ? 'available' : 'unavailable'}">${book.available}</p> */}
             <p >{book.description}</p>
             <div class="rate">
                  <i style={{fontSize: "12px", color:"orange"}} class="fa fa-star checked"></i>
                                    {/* <span style="font-size: 12px;" id="book-rating-">${book.rating}</span> */}
                  </div>
                     <h5 id="book-price">$ {book.price}.00</h5>
                     <div>
            <button className={styles.btn} onClick={decrementQuantity}>-</button>
            <span class={styles.spquantity}>{quantity}</span>
            <button className={styles.btn} onClick={incrementQuantity}>+</button>
          </div>
                      <div className={styles.bookcardbutton} >
                      <button style={{ display: 'flex', alignItems: 'center' }}
onClick={handleAddToCart}
              // onClick={() => handleBuyBook(book._id)}
              >
     
                  Buy Book  <ShoppingCartIcon  style={{ marginLeft: '10px' }} />
                </button>   
                      </div>
                                {/* ${book.available == 'available' ? `
                                    <button class="btn btn-primary buy" id="buy">Buy <i class="fas fa-cart-plus add-to-cart-icon"></i></button>
                                    <button class="btn btn-primary borrow" id="borrow-">Borrow <i class="fas fa-cart-plus add-to-cart-icon"></i></button>
                                ` : `
                                    <button class="btn btn-secondary wishlist" id="wishlist">Add to Wishlist</button>
                                `} */}

                                
                        </div>
           </div>
   </div>

  );
};

export default BookDetails;
    // <div>
    //   <h1>{book.bookName}</h1>
    //   <p>By {book.author}</p>
    //   {book.image && <img src={`${api}/${book.image}`} alt={book.bookName} />}
    //   <p>{book.description}</p>
    //   {/* Render other book details as needed */}
    // </div>