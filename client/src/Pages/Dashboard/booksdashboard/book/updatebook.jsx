import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Axios from "axios";
import "semantic-ui-css/semantic.min.css";
import { Dropdown } from "semantic-ui-react";
import styles from "./bookpage.module.css";

function UpdateBook() {
  const api = "http://localhost:3001";
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [bookName, setBookName] = useState("");
  const [alternateTitle, setAlternateTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [image, setImage] = useState(null);
  const [bookCountAvailable, setBookCountAvailable] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  //   const [bookId, setBookId] = useState(match.params.id); // Assuming you're using React Router for routing

  useEffect(() => {
    const getAllCategories = async () => {
      try {
        const response = await Axios.get(`${api}/bookcategories`);
        const all_categories = response.data.map((category) => ({
          value: category._id,
          text: category.categoryName,
        }));
        setAllCategories(all_categories);
      } catch (err) {
        console.log(err);
      }
    };

    const fetchBookData = async () => {
      try {
        const response = await Axios.get(`${api}/getbook/${id}`);
        const book = response.data;
        setBookName(book.bookName);
        setAlternateTitle(book.alternateTitle || "");
        setAuthor(book.author);
        setBookCountAvailable(book.bookCountAvailable || "");
        setSelectedCategories(book.categories);
        setDescription(book.description);
        setPrice(book.price);
        // Assuming book.imageURL contains the URL of the existing image
        setImage(book.imageURL || null);
      } catch (err) {
        console.log(err);
      }
    };

    getAllCategories();
    fetchBookData();
  }, [id, api]);

  const navigate = useNavigate();
  const updateBook = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const BookData = {
      bookName,
      alternateTitle,
      author,
      bookCountAvailable,
      categories: selectedCategories,
      description,
      price,
      image,
    };

    try {
      // const formData = new FormData();
      // formData.append("bookName", bookName);
      // formData.append("alternateTitle", alternateTitle);
      // formData.append("author", author);
      // formData.append("bookCountAvailable", bookCountAvailable);
      // formData.append("categories", selectedCategories);
      // if (image) {
      //   formData.append("image", image);
      // }

      await Axios.put(`${api}/updatebook/${id}`, BookData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Book Updated Successfully 🎉");
      navigate("/allbook");
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  };

  return (
    <div className={styles.all}>
      <div className={styles.mxauto}>
        <div className={styles.homdiv}>
          <div className="dashboard-title-line"></div>
          <form className={styles.formcustom} onSubmit={updateBook}>
            <h2 className={styles.h2custom}>Update Book</h2>
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
              required
            />
            <br /> <br />
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
              required
            />
            <br /> <br />
            <label className={styles.addbookformlabel} htmlFor="description">
              Description
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
              required
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
              required
            />
            <br /> <br />
            <label className={styles.addbookformlabel} htmlFor="categories">
              Categories<span className="required-field"></span>
            </label>
            <br />
            <br />
            <div className={styles.semanticdropdown}>
              <Dropdown
                style={{ width: "100%", height: "30px", border: "1px solid rgb(199, 196, 196)" }}
                placeholder="Category"
                // multiple
                //   fluid
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
            <input className={styles.custombutton} type="submit" value="Update Book" disabled={isLoading} />
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateBook;
