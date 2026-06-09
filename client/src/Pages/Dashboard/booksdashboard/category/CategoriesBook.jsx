import React, { useState } from "react";
import Axios from "axios";
// import { Container, Form } from 'react-bootstrap';

// import Home from './Home'; // Import the UI component
// import './App.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
import styles from "./categorypage.module.css";

export default function CategoriesBook() {
  const api = "http://localhost:3001";
  // const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  //  const [images, setImages] = useState([]);
  // const [uploading, setUploading] = useState(false);

  // const [file, setFile] = useState(null);

  // const handleFileChange = (e) => {
  //   setPhotos(e.target.files[0]); // Set the single file
  //   // setPhotos(e.target.files); kenet haydi

  //   // setPhotos([...e.target.files]);
  // };

  // const handleFileChange = (e) => {
  //   const files = Array.from(e.target.files);
  //   setImages(files);
  //   //  setFile(e.target.files[0]);
  // };

  //kenet mawjoudi

  // useEffect(() => {
  //   Axios.get(`${api}/categories`)
  //     .then((res) => setCategories(res.data))
  //     .catch((err) => console.error("Error fetching category:", err));
  // }, []); // Only run once on component mount
  //  setMessage(error.response?.data?.message || 'Login failed');
  // //
  // const createCategory = () => {
  //   const userAdmin = localStorage.getItem("userAdmin") === "true";
  //   if (userAdmin) {
  //     try {
  //       if (!categoryName) {
  //         setMessage("Please fill in all the required fields.");

  //         return;
  //       }
  //       // const token = localStorage.getItem("token");
  //       // const sessionToken = localStorage.getItem("sessionToken");
  //       if (categoryName) {
  //         Axios.post(
  //           `${api}/createbookCategory`,
  //           { categoryName }
  //           // {
  //           //   headers: {
  //           //     Authorization: `Bearer ${token}`, // Include the token in the Authorization header
  //           //   },
  //           // }
  //         ).then((res) => res.data);
  //       } else {
  //         console.log("Category name is required");
  //       }
  //       console.log(userAdmin);
  //     } catch (error) {
  //       if (error.response && error.response.status === 400) {
  //         // Handle the error if the book name already exists
  //         setMessage(error.response.data.message || "Error: Unable to add the book.");
  //       } else {
  //         setMessage("An error occurred. Please try again later.");
  //       }
  //       // console.error("Create failed:", error.response?.data?.message || error.message);
  //       // setMessage(error.response?.data?.message || "Create failed");
  //     }
  //   } else {
  //     console.log("User is not an admin");
  //   }
  // };
  const createCategory = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const userAdmin = localStorage.getItem("userAdmin") === "true";

    // Check if the user is an admin
    if (userAdmin) {
      setIsLoading(true); // Set loading state while making the request

      try {
        if (!categoryName) {
          setMessage("Please fill in all the required fields.");
          setIsLoading(false); // Stop loading after setting the message
          setTimeout(() => setMessage(""), 20000); // Hide the message after 3 seconds
        }

        // Proceed with the category creation
        Axios.post(`${api}/createbookCategory`, { categoryName })
          .then((res) => {
            setMessage("Category created successfully!");
            setIsLoading(false); // Stop loading after success
            setTimeout(() => setMessage(""), 20000); // Hide the success message after 3 seconds
          })
          .catch((error) => {
            // Handle errors from the API
            if (error.response && error.response.status === 400) {
              setMessage(error.response.data.message || "Error: Unable to create category.");
            } else if (error.response && error.response.status === 422) {
              setMessage(
                error.response.data.message ||
                  "Category name must be a valid string and cannot contain numbers."
              );
            }
            setIsLoading(false); // Stop loading after error
            setTimeout(() => setMessage(""), 20000); // Hide the error message after 3 seconds
          });
      } catch (error) {
        setMessage("An unexpected error occurred.");
        setIsLoading(false); // Stop loading on unexpected error
        setTimeout(() => setMessage(""), 20000); // Hide the error message after 3 seconds
      }
    } else {
      setMessage("You are not an admin.");
      setTimeout(() => setMessage(""), 20000); // Hide the message after 3 seconds
    }
  };
  // const createCategory = async () => {
  //   try {
  //     const formData = new FormData();
  //     formData.append("name", name);

  //     formData.append("description", description);
  //     // formData.append('photo', file);
  //     //   images.forEach(photo => {
  //     //     formData.append('files', photo);
  //     // });
  //     if (photos) {
  //       formData.append("photos", photos); // Append the single file
  //     }

  //     const response = await Axios.post(`${api}/createbookCategory`, formData, {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //       },
  //     });

  //     console.log("Category created:", response.data);

  //     // Clear the form or handle response as needed
  //     setName("");
  //     setDescription("");
  //     setPhotos(null);
  //     // Update products state or do any necessary actions after creation
  //   } catch (error) {
  //     console.error("Error creating category:", error);
  //   }
  // };

  // const createProduct = () => {

  //   if (name && description && price) {
  //     Axios.post(`${api}/createProduct`,{ name, price, description })
  //       .then(res => {
  //         // Update products state after successful creation
  //         setProducts([...products, res.data]);
  //         // Clear input fields
  //         setName("");
  //         setPrice("");
  //         setDescription("");
  //       })
  //       .catch(err => console.error("Error creating product:", err));
  //   }
  // };

  return (
    // <Container>
    <div className={styles.all}>
      <div className={styles.mxauto}>
        <div className={styles.homdiv}>
          <form className={styles.formcustom}>
            <h2 className={styles.h2custom}>Create Categories</h2>
            <p className={styles.line}></p>
            <br />
            <label className={styles.addbookformlabel} htmlFor="bookName">
              Category Name<span className="required-field"></span>
            </label>
            <br />
            <input
              type="text"
              placeholder="Name"
              className={styles.inputcustom}
              // className="block w-full px-4 py-2 border border-gray-300 rounded mb-4"
              onChange={(e) => setCategoryName(e.target.value)}
            />
            {/* <Form.Control type="text" placeholder='Name' onChange={e => setName(e.target.value)} /> */}

            {/* <Form.Control type="text" placeholder='description' onChange={e => setDescription(e.target.value)} /> */}

            {/* <Form.Control  type="file" multiple name='photos' onChange={handleFileChange} accept="image/*" /> */}
            {/* <button type="submit" onClick={createCategory} className="customButton"   >Create Category</button> */}

            <br />
            <button type="submit" onClick={createCategory} className={styles.custombutton}>
              Create Category
            </button>

            <div className="signup-option">
              {message && <div className="signup-question">{message}</div>}
              {/* <p className="signup-question">Don't have an account? <span className='span' onClick={handleSignUpClick}>Create An Account</span></p> */}
            </div>
            {/* {message && <div className="message">{message}</div>} */}
          </form>
        </div>
      </div>
    </div>
  );
}
