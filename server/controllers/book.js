import express from "express"
import Book from "../models/Book.js"
import BookCategoryModel from '../models/BookCategory.js';
import multer,{ diskStorage } from "multer";

// export const upload = multer({ dest: 'uploads/' });
const storage = diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/'); // Save uploaded files to 'uploads' directory
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname); // Use original file name
    }
  });
  export const upload = multer({ storage: storage });

  export const AllBook = async (req, res) => {
    try {
      const books = await Book.find().populate('categories', 'categoryName');
      res.json(books);
    } catch (error) {
      res.status(500).json({ message: `Error: ${error.message}` });
    }
  };
//
export const getbookbyid= async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        res.status(200).json(book)
    }
    catch {
        return res.status(500).json(err)
    }
}

//3asha yo3rod l categoryName
export const getdetailsbookbyid= async (req, res) => {
    try {
        const book = await Book.findById(req.params.id).populate('categories', 'categoryName');
        res.status(200).json(book)
    }
    catch {
        return res.status(500).json(err)
    }
}


export const createbook = async (req, res) => {
    // if (req.body.isAdmin) {
        try {
            const existingBook = await Book.findOne({ bookName: req.body.bookName });

            if (existingBook) {
                // If the book already exists, return a 400 error with a message
                return res.status(400).json({ message: "Book with this name already exists." });
            }
            const newbook = await new Book({

                // bookName: req.body.bookName,
                // alternateTitle: req.body.alternateTitle,
                // author: req.body.author,
                // bookCountAvailable: req.body.bookCountAvailable,
                // // Assuming 'req.file' contains information about the uploaded image
                // image: req.file ? req.file.path : null,
                // bookStatus: req.body.bookStatus,
                // categories: JSON.parse(req.body.categories),

                bookName: req.body.bookName,
                // alternateTitle: req.body.alternateTitle,
                author: req.body.author,
                bookCountAvailable: req.body.bookCountAvailable,
               image:req.file ? req.file.path : null,
            // image:req.file.path,
                bookStatus: req.body.bookSatus,
                description:req.body.description,
                price:req.body.price,
                categories: req.body.categories
            })
            const book = await newbook.save()
            await BookCategoryModel.updateMany({ '_id': book.categories }, { $push: { books: book._id } });
            res.status(200).json(book)
        }
        catch (err) {
            res.status(504).json({ message: "Server error", error: err });
        }
    // }
    // else {
    //     return res.status(403).json("You dont have permission to delete a book!");
    // }


    // const images = req.file ? req.file.path : null; 
}
// export const updateCategory = async (req, res) => {
//     try {
//       const { bookName,alternateTitle ,author,bookCountAvailable,image,bookStatus,categories} = req.body;
    
  
//       const updatedBook = await BookCategoryModel.findByIdAndUpdate(
//         req.params.id,
//         { bookName,alternateTitle ,author,bookCountAvailable,image,bookStatus,categories },
//         { new: true }
//       );
//       res.json(updatedBook);
//     } catch (error) {
//       res.status(500).json({ message: `Error: ${error.message}` });
//     }
//   };
export const updatebook= async (req, res) => {
    // if (req.body.isAdmin) {
        try {
         
            const { bookName,alternateTitle ,author,bookCountAvailable,bookStatus,categories,description,price} = req.body;
            const image = req.file ? req.file.path : null; 
            const currentBook = await Book.findById(req.params.id);
            // if (!currentBook) {
            //     return res.status(404).json("Book not found");
            // }


            // $pull ya3ni yma7i,2awal shi bya3mel delete la category li jeyi mn la params
            await BookCategoryModel.updateMany({ '_id': currentBook.categories }, { $pull: { books: currentBook._id } });
         
            //byerja3 bya3ml update lal book
            const updatedBook=  await Book.findByIdAndUpdate(req.params.id, 
                {bookName,alternateTitle ,author,bookCountAvailable,image,bookStatus,categories,description,price
                // $set: req.body,
            },  { new: true });
        
                

                    //push ydif ,byerja3 bi dif 3ala l category li jeyi mnl update
                    await BookCategoryModel.updateMany({ '_id': updatedBook.categories }, { $addToSet: { books: updatedBook._id } });  
                     //$addToSet : bass ydif iza ma kent mawjoudi 
                   
            res.json(updatedBook);
   
            // res.status(200).json("Book details updated successfully");
        }
        catch (err) {
            res.status(504).json(err);
        }
    // }
    // else {
    //     return res.status(403).json("You dont have permission to delete a book!");
    // }
}
export const deletebook = async (req, res) => {
    try {
        const currentBook = await Book.findById(req.params.id);
        // if (!currentBook) {
        //     return res.status(404).json("Book not found");
        // }

      await Book.findByIdAndDelete(req.params.id);
      await BookCategoryModel.updateMany({ '_id': currentBook.categories }, { $pull: { books: currentBook._id } });
      
      res.status(204).send(); // No Content
    } catch (error) {
      res.status(500).json({ message: `Error: ${error.message}` });
    }
  };
/* Remove book  */
export const deletebook2= async (req, res) => {
    // if (req.body.isAdmin) {
        try {
            const _id = req.params.id
            const book = await Book.findOne({ _id })
            await book.remove()
            await BookCategory.updateMany({ '_id': book.categories }, { $pull: { books: book._id } });
            res.status(200).json("Book has been deleted");
        } catch (err) {
            return res.status(504).json(err);
        }
    // } else {
    //     return res.status(403).json("You dont have permission to delete a book!");
    // }
}