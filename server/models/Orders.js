import mongoose from "mongoose";

// Order Schema
const OrderSchema = new mongoose.Schema(
  {
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },
 
    books: [
      {
        book: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Book", 
          required: true,
        },
        quantity: {
          type: Number,
        //   required: true,
        //   min: 1,
        },
        priceAtOrder: {
          type: Number,
        //   required: true, 
        },
        imageOrder: {
            type: String, 
            // default: "",   
          },
      },
    ],
  
    orderStatus: {
      type: String,
      enum: ["Pending", "Shipped", "Delivered", "Cancelled"],
      default: "Pending",
    },
    shippingAddress: {
      type: String,
    //   required: true, // Address where the order will be shipped
    },
    
    // paymentStatus: {
    //   type: String,
    //   enum: ["Pending", "Paid", "Failed"],
    //   default: "Pending",
    // },
    payment:{type:Boolean,default:false},
    orderDate: {
      type: Date,
      default: Date.now,
    },
  
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

export default mongoose.model("Order", OrderSchema);
