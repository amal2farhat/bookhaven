import BookCategoryModel from '../models/BookCategory.js'; // Ensure CategoryModel is correctly exported in Category.js

const Validate = {
  string: (value) => typeof value === 'string' && value.trim() !== '',
  number: (value, { min }) => typeof value === 'number' && value >= min
};

export const AllCategory = async (req, res) => {
  try {
    const categories = await BookCategoryModel.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: `Error: ${error.message}` });
  }
};
//  if (req.body.isAdmin) {
export const createCategory = async (req, res) => {
 
  try {
    const { categoryName } = req.body;
    const invalidCategoryNamePattern = /\d/;  // Regular expression to check for digits (0-9)

    if (!categoryName || invalidCategoryNamePattern.test(categoryName)) {
      return res.status(422).json({ errorCode: "INVALID_CATEGORY_NAME", message: "Category name must be a valid string and cannot contain numbers." });
    }
    // if (!Validate.string(categoryName)) {
    //   return res.status(422).json({ errorCode: "INVALID_CATEGORY_NAME", message: "Category name must be a valid string." });
    // }
    // if (!Validate.string(categoryName)) {
    //   return res.status(400).json({ message: "Invalid input data" });
    // }

  

    const existingCategory = await BookCategoryModel.findOne({ categoryName });
    if (existingCategory) {
      return res.status(400).json({ message: "Category name already exists" });
    }

  
    const newCategory = new BookCategoryModel({ categoryName });
    await newCategory.save();
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).json({ message: `Error: ${error.message}` });
  }

};
// export const createCategory = async (req, res) => {
//   try {
//     const { categoryName } = req.body;

//     if (!Validate.string(categoryName)) {
//       return res.status(400).json({ message: "Invalid input data" });
//     }

//     const existingCategory = await BookCategoryModel.findOne({ categoryName });
//     if (existingCategory) {
//       return res.status(400).json({ message: "Category name already exists" });
//     }

//     const newCategory = new BookCategoryModel({ categoryName });
//     await newCategory.save();
//     res.status(201).json({
//       message: "Category created successfully!",
//       category: newCategory,
//     });
//   } catch (error) {
//     console.error(`Error creating category: ${error.message}`); // Log detailed error on the server
//     res.status(500).json({ message: `Error: Unable to create category. Please try again later.` });
//   }
// };

export const GetoneCategorieByid = async (req, res) => {
  try {
    const category = await BookCategoryModel.findById(req.params.id);
    res.json(category);
  } catch (error) {
    res.status(500).json({ message: `Error: ${error.message}` });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    await BookCategoryModel.findByIdAndDelete(req.params.id);
    res.status(204).send(); // No Content
  } catch (error) {
    res.status(500).json({ message: `Error: ${error.message}` });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { categoryName } = req.body;
  

    const updatedCategory = await BookCategoryModel.findByIdAndUpdate(
      req.params.id,
      { categoryName },
      { new: true }
    );
    res.json(updatedCategory);
  } catch (error) {
    res.status(500).json({ message: `Error: ${error.message}` });
  }
};



// // import CategoryModel from '../models/Category.js';
// import CategoryModel, { find, findOne, deleteOne, findByIdAndUpdate } from '../models/Category.js';

// import multer, { diskStorage } from 'multer';
// const storage = diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/'); // Save uploaded files to 'uploads' directory
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname); // Use original file name
//   }
// });
// export const upload = multer({ storage: storage });

// const Validate = {
//   string: (value) => typeof value === 'string' && value.trim() !== '',
//   number: (value, { min }) => typeof value === 'number' && value >= min
// };


// export const AllCategory = async (req, res) => {
//   try {
//     const categories = await find();
//     res.json(categories);
//   } catch (error) {
//     res.status(500).json({ message: `Error: ${error.message}` });
//   }
// };

// // export const AllCategory=  async (req, res)=>{
// //     const category = await find();
// //     res.json(category)
// // };
// // const createCategory = async (req, res) => {
// //   try {
// //       const { name, description } = req.body;

// //       // Validate inputs
// //       const valid = {
// //           name: Validate.string(name),
// //           // price: Validate.number(price, { min: 0 }),
// //           description: Validate.string(description),
// //       };

// //       // Check if all validations passed
// //       if (!valid.name || !valid.description) {
// //           return res.status(400).json({ message: "Invalid input data" });
// //       }

// //       // Handle file upload (if applicable)
// //       const images = req.files.map(file => file.path); 
// //       // const images = req.files && Array.isArray(req.files) 
// //       //     ? req.files.map(file => file.path)
// //       //     : []; // Default to an empty array if no files are uploaded

// //       // Check if the category already exists
// //       const category = await CategoryModel.findOne({ name });
// //       if (category) {
// //           return res.status(400).json({ message: "Category name already exists" });
// //       }

// //       // Create and save the new category
// //       const newCategory = new CategoryModel({ name, description, price, images });
// //       await newCategory.save();

// //       res.status(201).json(newCategory); // 201 Created status code
// //   } catch (error) {
// //       res.status(500).json({ message: `Error: ${error.message}` });
// //   }
// // };

// export const createCategory = async (req, res) => {
//     try {
//       const { name, description } = req.body;



//       if (!Validate.string(name) || !Validate.string(description)) {
//         return res.status(400).json({ message: "Invalid input data" });
//     }
//     //   const photos = req.files.map(file => {
//     //     return { filename: file.filename, path: file.path };
//     // });
//     //  const filePath = req.file.path;
//       const images = req.file.path; 
//       // const images = req.file ? req.file.path : ''; // Get the path to the uploaded file
  
//       const category = await findOne({ name });
//       if (category) {
//         return res.status(400).json({ name: "Category name already exists" });
//       }
  
//       const newCategory = new CategoryModel({ name, description, images });
//       await newCategory.save();
//       res.json(newCategory);
//       // res.status(204).json({ message: `category added...` });
//     } catch (error) {
//       res.status(500).json({ message: `Error: ${error.message}` });
//     }
//   };

//   export const GetoneCategorieByid= async (req, res) => {
//     const oneCategory = await findOne({_id:req.params.id});
    
//     res.send(oneCategory);
//     // res.json(req.body)
// }
  
// // const createProduct=async (req, res) => {
  

// //    try{
// //     ProductModel.findOne({name:req.body.name}).then(product =>{
// //         if(product){
// //             return res.status(400).json({name:"prpduct name already exist"});
// //         }else{
// //             const newProduct = new ProductModel(req.body);
// //             newProduct.save();
// //             res.json(req.body)
// //         }
// //     })
   

// //    }catch(error){
// //     req.status(500).json({message:`error ${error}`})
// //    }
// // };

// export const deleteCategory=async (req, res) => {
//     const deleteCategory = await deleteOne({_id:req.params.id});
//     // res.send(deleteCategory);
//          // Successfully deleted
//          res.status(204).send(deleteCategory); // 204 No Content
//     // res.status(204).json({ message: `deleted category` });
//     // res.json(req.body)
// };
// export const updateCategory=async (req, res) => {
// try{
//   const { name, description } = req.body;
//   // let images = [];

//   // Check if there are new images uploaded
//   // if (req.files && req.files.length > 0) {
//   //   images = req.files.map(file => file.path); // Assuming you are storing file paths
//   // }

//   // const { name, price, description } = req.body;
//   // const images = req.file.path; 
//   const images = req.file ? req.file.path : null; 
//     // const images = req.files.map(file => file.path); 

//   // Check if there are new photos uploaded
//   // if (req.files) {
//     // photos = req.files.map(file => file.path);
//   // }
//   const updatedCategory = await findByIdAndUpdate(
//     req.params.id,  // First argument: id of the document to update
//     {
//       name,
//       description,
    
//       images // Update the imageUrl field if an image was uploaded
//     },
//     // req.body,   
//         // Second argument: updated data from req.body
//     { new: true }   // Optional third argument: { new: true } to return the updated document
// );

// // const oneProduct = await ProductModel.findByIdAndUpdate(
// //     // {_id:req.params.id,req.body.}
// // );

// res.send(updatedCategory);
// // res.json(req.body)
// }catch(error) {
//   res.status(500).json({ message: `Error: ${error.message}` });
// }

// }

// // const updateProduct=async (req, res) => {
// //     const delProduct = await ProductModel.deleteOne({_id:req.params.id});
// //     res.send(delProduct);
// //     // res.json(req.body)
// // };


// // export default{AllCategory,createCategory,deleteCategory,upload,GetoneCategorieByid,updateCategory};