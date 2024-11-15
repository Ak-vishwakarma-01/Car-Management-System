import mongoose from "mongoose";

const ImageSchema = new mongoose.Schema({
    imglink: {
        type: String,
        required: true,
    }, 
},{timestamps:true}
);


export default mongoose.model("Image", ImageSchema); 
