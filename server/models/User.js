import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({

    userFullName: {
        type: String,
        require: true,
        unique: true
    },
    
    address: {
        type: String,
        default: ""
    },

      email: {
        type: String,
        require: true,
        max: 50,
        unique: true
    },
    password: {
        type: String,
        require: true,
        min: 6
    },
    
    isAdmin: {
        type: Boolean,
        default: false
    }
},
    {
        timestamps: true
    });

export default mongoose.model("User", UserSchema);