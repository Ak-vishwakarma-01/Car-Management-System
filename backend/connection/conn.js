import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const conn = async()=>{
    try{
        const response = await mongoose.connect('mongodb+srv://akv8272:yporfkBreOt2PHtx@carmanagement.huy3o.mongodb.net/?retryWrites=true&w=majority&appName=Carmanagement');
        if(response)console.log("connected to DB");

    }catch(error){
        console.log(error);
    }

}

export default conn();