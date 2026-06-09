// CREATE SERVER

import dotenv from "dotenv";
dotenv.config();
import express, { json, urlencoded } from "express";
import cors from "cors";
import { join } from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import authRoutes from "./routes/auth.js";

import bodyParser from "body-parser";
import categoriesRouter from "./routes/BookCategory.js";
import bookRouter from "./routes/book.js";
import cartRouter from "./routes/cartRoutes.js";
import stripeRouter from "./routes/checkoutRoutes.js";
import { connect } from "mongoose";

const app = express();
console.log("ENV TEST:", process.env.STRIPE_SECRET_KEY);
// Define __dirname for ES Module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const allowedOrigins = ["http://localhost:3000", "http://localhost:3001"];

app.use(
  cors({
    origin: allowedOrigins,
    allowedHeaders: ["Content-Type", "Authorization", "x-auth-token"],
  }),
);
app.use(json());
app.use(urlencoded({ extended: true }));

app.use(bodyParser.json());

app.use("/uploads", express.static(join(__dirname, "uploads")));
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

import multer from "multer";

// CONNECT TO DB
connect(`mongodb://127.0.0.1:27017/library`);

// const username = process.env.USERNAME,
//     password = process.env.PASSWORD,
//     database = process.env.DB;
// mongodb+srv://amalfarah222:7oxO9pWIp3KBs5g0@mainamal.yokhs7r.mongodb.net/

// mongoose.connect(`mongodb+srv://${username}:${password}@cluster0.1qkmtpq.mongodb.net/${database}?retryWrites=true&w=majority`)
// 'mongodb://127.0.0.1:27017/shopping-cart'

app.use("/", bookRouter);
app.use("/", categoriesRouter);
app.use("/", authRoutes);
app.use("/", cartRouter);
app.use("/", stripeRouter);

app.listen(3001, () => {
  console.log("Server Works");
});
