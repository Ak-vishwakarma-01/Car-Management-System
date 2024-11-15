import mongoose from "mongoose";

const CarSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true, 
    },
    desc: {
        type: String,
        required: true,
    },
    important:{
        type:Boolean,
        default:false,
    },
    tags:{
        type: String,
        required: true,
    },
    images:[
        {
            type:mongoose.Types.ObjectId,
            ref:"Image",
        },
    ],
},{timestamps:true}
);


export default mongoose.model("Car", CarSchema); 
