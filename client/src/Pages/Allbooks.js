import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Axios from "axios";
import { IconButton, Badge } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import "./Allbooks.css";



function Allbooks() {
  const api = "http://localhost:3001";
  const [books, setBooks] = useState([]);

  const navigate = useNavigate();
  
  useEffect(() => {
    Axios.get(`${api}/allbooks`)
      .then((res) => {
        setBooks(res.data);
        console.log(res.data);
      })
      .catch((err) => console.error("Error fetching book:", err));
  }, []);

  const handleBuyBook = (bookId) => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      // setIsLoggedIn(false);
      // alert("Please log in to view your cart.");
      navigate("/signin");
      return; 
    }
    navigate(`/book/${bookId}`);
  };
  return (
   <>
    <div className="books-page">
    {/* {books.map((book) => ( */}
      <div className="books" >
      {books.map((book) => (
        <div className="book-card"  key={book._id}>
          {book.image && book.image.length > 0 && (
          <img
             src={`${api}/${book.image}`}   alt=""
          ></img>
        )}
          <p className="bookcard-title">{book.bookName}</p>
          <p className="bookcard-author">By {book.author}</p>
          <div className="bookcard-category">
            {/* <p>Buy <ShoppingCartIcon/></p> */}
            <button className="btnshad"
           
              onClick={() => handleBuyBook(book._id)}>
     
      Buy Book  <ShoppingCartIcon  style={{ marginLeft: '10px' }} />
    </button>
            {/* <p>{book.categories.categoryName}</p> */}
          </div>
          <div className="bookcard-emptybox"></div>
        </div>
   
      ))}
      </div>
        {/* //  ))} */}
    </div></>
  );
}

export default Allbooks;
