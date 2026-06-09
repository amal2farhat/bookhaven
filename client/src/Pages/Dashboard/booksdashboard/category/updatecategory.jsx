import React, { useState, useEffect } from "react";
import Axios from "axios";
// import { Container, Form } from 'react-bootstrap';
import { useNavigate, useParams } from "react-router-dom";

// import Home from './Home'; // Import the UI component
// import './App.css';
import styles from "./categorypage.module.css";

export default function UpdateCategoriesPage() {
  const api = "http://localhost:3001";

  // const [products, setProducts] = useState([]);

  // const params=useParams();
  const { id } = useParams();
  const [values, setValues] = useState({
    id: id,
    categoryName: "",
  });

  useEffect(() => {
    Axios.get(`${api}/bookcategories/${id}`)
      .then((res) => {
        setValues((prevValues) => ({
          ...prevValues,

          categoryName: res.data.categoryName,
        }));
        // setValues({...values,description:res.data.description,name:res.data.name,images:res.data.images})
      })
      .catch((err) => console.error("Error fetching products:", err));
    // getOneProduct();
    // Axios.get(`${api}/products/${params.id}`)
    //   .then(res => setProducts(res.data))
    //   .catch(err => console.error("Error fetching products:", err));
  }, [id]);
  const navigate = useNavigate();

  const handleUpdate = (e) => {
    e.preventDefault();

    Axios.put(`${api}/bookcategories/${id}`, { categoryName: values.categoryName })
      .then((res) => {
        navigate("/bookcategories");
      })
      .catch((err) => console.error("Error fetching products:", err));
  };

  return (
    <div className={styles.all}>
      <div className={styles.mxauto}>
        <div className={styles.homdiv}>
          <form className={styles.formcustom}>
            <h2 className={styles.h2custom}>Update Categories</h2>
            <p className={styles.line}></p>
            <br />
            <label className={styles.addbookformlabel} htmlFor="bookName">
              Category Name<span className="required-field"></span>
            </label>
            <input
              type="text"
              value={values.categoryName}
              placeholder="Name"
              className={styles.inputcustom}
              // className="block w-full px-4 py-2 border border-gray-300 rounded mb-4"
              onChange={(e) => setValues({ ...values, categoryName: e.target.value })}
            />
            <br />

            {/* <Form.Control type="text" value={values.name} placeholder='Name' onChange={e => setValues({...values,name:e.target.value})} />
         <Form.Control type="text" value={values.description} placeholder='description' onChange={e => setValues({...values,description:e.target.value})} /> */}

            {/* <Form.Control  type="file" multiple name='photos'  onChange={handleFileChange} accept="image/*" /> */}
            <button type="submit" className={styles.custombutton} onClick={handleUpdate}>
              Update Category
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

////
// src/components/UpdateCategory.js
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// function UpdateCategory() {
//   const [categories, setCategories] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState('');
//   const [newName, setNewName] = useState('');

//   useEffect(() => {
//     // Fetch categories on component mount
//     axios.get('http://localhost:5000/categories')
//       .then(response => setCategories(response.data))
//       .catch(error => console.error('Error fetching categories:', error));
//   }, []);

//   const handleCategoryChange = (event) => {
//     setSelectedCategory(event.target.value);
//   };

//   const handleNameChange = (event) => {
//     setNewName(event.target.value);
//   };

//   const handleUpdate = () => {
//     axios.put(`http://localhost:5000/categories/${selectedCategory}`, { name: newName })
//       .then(response => {
//         console.log('Category updated:', response.data);
//         // Optionally refresh the list of categories
//         setCategories(categories.map(cat => cat._id === response.data._id ? response.data : cat));
//       })
//       .catch(error => console.error('Error updating category:', error));
//   };

//   return (
//     <div>
//       <h2>Update Category</h2>
//       <select value={selectedCategory} onChange={handleCategoryChange}>
//         <option value="">Select a category</option>
//         {categories.map(cat => (
//           <option key={cat._id} value={cat._id}>{cat.name}</option>
//         ))}
//       </select>
//       <input
//         type="text"
//         value={newName}
//         onChange={handleNameChange}
//         placeholder="New category name"
//       />
//       <button onClick={handleUpdate}>Update</button>
//     </div>
//   );
// }

// export default UpdateCategory;
