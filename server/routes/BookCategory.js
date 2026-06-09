// import { Router } from "express";
// const router=Router();



// // import CategoryModel from '../models/Category.js';
// import { AllCategory, createCategory, deleteCategory, upload, GetoneCategorieByid, updateCategory } from "../controllers/AdminCategories.js";

import { Router } from 'express';
import { AllCategory, createCategory, deleteCategory, GetoneCategorieByid, updateCategory } from '../controllers/BookCategories.js';
// import isAdmin from '../controllers/middlware.js';
// import authenticate from '../controllers/authenticate.js';

const router = Router();





router.get("/bookcategories", AllCategory);
// router.post("/createbookCategory",authenticate, isAdmin,createCategory);
router.post("/createbookCategory",createCategory);
router.delete("/bookcategory/:id", deleteCategory);
router.get("/bookcategories/:id",GetoneCategorieByid),
router.put("/bookcategories/:id",updateCategory);


export default router;

