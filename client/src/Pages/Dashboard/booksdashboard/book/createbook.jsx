// import React from "react";

// export default function Createbook() {
//   return <div>createbook</div>;
// }
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import "semantic-ui-css/semantic.min.css";
import { Dropdown } from "semantic-ui-react";

import styles from "./bookpage.module.css";

function Createbook() {
  const api = "http://localhost:3001";
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [bookName, setBookName] = useState("");
  // const [alternateTitle, setAlternateTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [image, setImage] = useState([]);
  const [bookCountAvailable, setBookCountAvailable] = useState("");
  const [selectedCategories, setSelectedCategories] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  //description
  const [allCategories, setAllCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getAllCategories = async () => {
      try {
        const response = await Axios.get(`${api}/bookcategories`);
        const all_categories = response.data.map((category) => ({
          value: category._id,
          // text: `${category.categoryName} (${category._id})`,

          text: category.categoryName,
        }));
        setAllCategories(all_categories);
      } catch (err) {
        console.log(err);
      }
    };
    getAllCategories();
  }, []);

  // useEffect(() => {
  //   Axios.get(`${api}/categories`)
  //     .then((res) => setCategories(res.data))
  //     .catch((err) => console.error("Error fetching category:", err));
  // }, []);

  const addBook = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (!bookName || !author || !bookCountAvailable || !selectedCategories || !description || !price) {
      setMessage("Please fill in all the required fields.");
      setIsLoading(false); // Stop loading if validation fails
      return;
    }

    // If an image is required but not provided, show an alert
    if (!image) {
      setMessage("Please upload an image.");
      setIsLoading(false); // Stop loading if image is missing
      return;
    }

    const BookData = {
      bookName,
      // alternateTitle,
      author,
      bookCountAvailable,
      categories: selectedCategories,
      image,
      description,
      price,
    };
    try {
      const response = await Axios.post(`${api}/createbook`, BookData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setBookName("");
      // setAlternateTitle("");
      setAuthor("");
      setBookCountAvailable("");
      setSelectedCategories("");
      setImage(null);
      setDescription("");
      setPrice("");
      alert("Book Added Successfully 🎉");

      navigate("/allbook");
    } catch (err) {
      if (err.response && err.response.status === 400) {
        // Handle the error if the book name already exists
        setMessage(err.response.data.message || "Error: Unable to add the book.");
      } else {
        setMessage("An error occurred. Please try again later.");
      }
    }
    setIsLoading(false);
  };

  return (
    <div className={styles.all}>
      <div className={styles.mxauto}>
        <div className={styles.homdiv}>
          {/* <p className="dashboard-option-title">Add a Book</p> */}
          <div className="dashboard-title-line"></div>
          <form className={styles.formcustom} onSubmit={addBook}>
            <h2 className={styles.h2custom}>Create Book</h2>
            <p className={styles.line}></p>
            <br />
            <label className={styles.addbookformlabel} htmlFor="bookName">
              Book Name<span className="required-field"></span>
            </label>
            <br />
            <input
              className={styles.inputcustom}
              type="text"
              name="bookName"
              value={bookName}
              onChange={(e) => setBookName(e.target.value)}
            />
            <br /> <br />
            {/* <label className={styles.addbookformlabel} htmlFor="alternateTitle">
            Title
          </label>
          <br />
          <input
            className={styles.addbookforminput}
            type="text"
            name="alternateTitle"
            value={alternateTitle}
            onChange={(e) => setAlternateTitle(e.target.value)}
          />
          <br /> <br /> */}
            <label className={styles.addbookformlabel} htmlFor="author">
              Author Name<span className="required-field"></span>
            </label>
            <br />
            <input
              className={styles.inputcustom}
              type="text"
              name="author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
            <br /> <br />
            <label className={styles.addbookformlabel} htmlFor="description">
              Description<span className="required-field"></span>
            </label>
            <br />
            <input
              className={styles.inputcustom}
              type="text"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <br /> <br />
            <label className={styles.addbookformlabel} htmlFor="copies">
              Quantity<span className="required-field"></span>
            </label>
            <br />
            <input
              className={styles.inputcustom}
              type="number"
              name="copies"
              value={bookCountAvailable}
              onChange={(e) => setBookCountAvailable(e.target.value)}
            />
            <br /> <br />
            <label className={styles.addbookformlabel} htmlFor="price">
              Price<span className="required-field"></span>
            </label>
            <br />
            <input
              className={styles.inputcustom}
              type="number"
              name="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <br /> <br />
            <label className={styles.addbookformlabel} htmlFor="categories">
              Categories<span className="required-field"></span>
            </label>
            <br />
            <br />
            <div className={styles.semanticdropdown}>
              <Dropdown
                style={{ height: "35px", border: "1px solid rgb(199, 196, 196)" }}
                placeholder="Category"
                fluid
                // multiple
                search
                selection
                options={allCategories}
                value={selectedCategories}
                onChange={(e, { value }) => setSelectedCategories(value)}
              />
            </div>
            <br />
            <input
              className={styles.filecustom}
              type="file"
              name="image"
              onChange={(e) => setImage(e.target.files[0])}
              accept="image/*"
            />
            <br /> <br />
            <input className={styles.custombutton} type="submit" value="Create Book" disabled={isLoading} />
            <div className="signup-option">
              {message && <div className="signup-question">{message}</div>}
              {/* <p className="signup-question">Don't have an account? <span className='span' onClick={handleSignUpClick}>Create An Account</span></p> */}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Createbook;
