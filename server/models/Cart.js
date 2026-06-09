// models/Cart.js
import mongoose from "mongoose";

const CartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },
    books: [
        {
            bookId: {
                type: mongoose.Types.ObjectId,
                ref: "Book",
                required: true
            },
            quantity: {
                type: Number,
                default: 1
            }
        }
    ]
}, {
    timestamps: true
});

export default mongoose.model("Cart", CartSchema);
