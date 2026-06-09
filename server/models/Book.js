import mongoose from "mongoose";

const BookSchema = new mongoose.Schema({
    
    bookName:{
        type:String,
        // require:true
    },
  
    author:{
        type:String,
        // require:true
    },
    description:{type:String},

    bookCountAvailable:{
        type:Number,
        // require:true
    },

    price:{type:Number},
    bookStatus:{
        type:String,
        default:"Available"
    },
    // image:   { type: String},
    image: String,
    categories:{ 
        type: mongoose.Types.ObjectId, 
        ref: "BookCategory" 
    },
  
},
{
    timestamps:true
})

export default mongoose.model("Book",BookSchema)
