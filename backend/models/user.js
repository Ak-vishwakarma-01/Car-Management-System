import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true, 
    },
    email: {
        type: String,
        required: true,
    },
    password:{
        type:String,
        required:true,
    },
    cars:[
        {
            type:mongoose.Types.ObjectId,
            ref:"Car",
        },
    ],
});


export default mongoose.model("User", userSchema); // Use PascalCase for the model name
