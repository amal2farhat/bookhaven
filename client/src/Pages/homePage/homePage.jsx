import React, { useEffect, useState } from "react";
import Axios from "axios"; // Ensure Axios is imported
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cards";

import "./homePage.css";
import ImageBook from "../../../src/assets/library/library1.jpg";
// import ImageBook from "../../../src/assets/library/book_image.jpg";
// import ImageBook from "../../../src/assets/library/libraryjif.gif";
// libraryjif
// import required modules
import { EffectCards } from "swiper/modules";
import Allbooks from "../Allbooks";
import { useNavigate } from "react-router-dom";
import BestBook from "./bestbook";
import Footer from "./footer";

function HomePage() {
  const [books, setBooks] = useState([]); // State to store fetched books
  const api = "http://localhost:3001"; // Adjust API endpoint as needed
  const navigate = useNavigate();
  useEffect(() => {
    // Fetch all books from the API
    Axios.get(`${api}/allbooks`)
      .then((res) => {
        setBooks(res.data); // Update state with fetched books
        console.log(res.data); // Log the fetched books (optional)
      })
      .catch((err) => console.error("Error fetching books:", err)); // Handle any errors
  }, []); // Empty dependency array means this runs once when the component mounts

  const handleImageClick = () => {
    // Navigate to the AllBooks page when an image is clicked
    navigate("/books");
  };
  return (
    <>
      <div className="allcontent">
        <div className="bookimage">
          <img src={ImageBook} alt="click image" />
        </div>
        <div className="container">
          <div className="content">
            <div className="text-section">
              <h2>By Your Books</h2>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus, nisi ut. Saepe nobis
                expedita dolorum corporis? Reiciendis suscipit veniam itaque, distinctio id velit repellat,
                tenetur eligendi, inventore maiores sint reprehenderit!
              </p>
            </div>
            <div className="empty-section">
              <Swiper effect={"cards"} grabCursor={true} modules={[EffectCards]} className="mySwiper">
                {/* Dynamically render SwiperSlides based on books */}
                {books.map((book, index) => (
                  <SwiperSlide key={book._id}>
                    {" "}
                    {/* Assuming each book has a unique _id */}
                    <div className="book-slide">
                      <img
                        className="imageswiper"
                        onClick={handleImageClick}
                        src={`${api}/${book.image}`}
                        alt={book.title}
                        style={{ width: "300px", height: "420px" }}
                      />{" "}
                      {/* Adjust based on your book data */}
                      {/* <h3>{book.title}</h3>
          <p>{book.author}</p>
          <p>${book.price}</p> */}
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
        <div></div>
        <Footer />
        {/* <Allbooks /> */}
      </div>
    </>
  );
}

export default HomePage;
{
  /* <div className="px-4 1g:px-24 bg-teal-100 flex item-center">
        <div className="flex w-full flex-col md:flex-row justify-between items-center gap-12 py-40">
          <div>
            <h2 className="text-5xl font-bold leading-snug text-black">By Your Books</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus, nisi ut. Saepe nobis
              expedita dolorum corporis? Reiciendis suscipit veniam itaque, distinctio id velit repellat,
              tenetur eligendi, inventore maiores sint reprehenderit!
            </p>
            <div></div>
          </div>
          <div></div>
        </div>
      </div> */
}
