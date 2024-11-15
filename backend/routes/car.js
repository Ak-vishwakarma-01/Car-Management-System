import express from "express"
const router = express.Router();

import Car from "../models/car.js"
import User from "../models/user.js"
import authenticateToken from "./auth.js"

router.post("/add-car",authenticateToken ,async(req,res)=>{
    try{
        const {title,desc,tags} = req.body;
        const {id} = req.headers;
        const newCar = new Car({title:title , desc:desc, tags: tags});
        const saveCar = await newCar.save();
        const carId = saveCar._id;
        await User.findByIdAndUpdate(id, {$push: {cars:carId}});
        res.status(200).json({message:"Car Created"});
    }catch(error){
        console.log(error);
        return res.status(400).json({message:"Internal Server Error"});
    }
});

router.get("/get-all-cars",authenticateToken,async(req,res)=>{
    try{
        const {id} = req.headers;
        const userData = await User.findById(id).populate({path: "cars",options:{sort:{createdAt:-1}}});
        res.status(200).json({data:userData});
    }catch(error){
        console.log(error);
        return res.status(400).json({message:"Internal Server Error"});
    }
});

router.delete("/delete-car/:id",authenticateToken,async(req,res)=>{
    try{
        const {id} = req.params;
        const userId = req.headers.id;
        await Car.findByIdAndDelete(id);
        await User.findByIdAndUpdate(userId,{$pull:{cars:id}});
        
        res.status(200).json({message:"Car Deleteed successfully"});
    }catch(error){
        console.log(error);
        return res.status(400).json({message:"Internal Server Error"});
    }
});

router.put("/update-car/:id",authenticateToken,async(req,res)=>{
    try{
        const {id} = req.params;
        const {title,desc,tags} = req.body;
        await Car.findByIdAndUpdate(id,{title:title,desc:desc,tags:tags})
        res.status(200).json({message:"Car Updated successfully"});
    }catch(error){
        console.log(error);
        return res.status(400).json({message:"Internal Server Error"});
    }
});

router.put("/update-imp-car/:id",authenticateToken,async(req,res)=>{
    try{
        const {id} = req.params;
        const CarData = await Car.findById(id);
        const impCar = CarData.important;
        await Car.findByIdAndUpdate(id,{important:!impCar})
        res.status(200).json({message:"Car Updated successfully"});
    }catch(error){
        console.log(error);
        return res.status(400).json({message:"Internal Server Error"});
    }
});

router.get("/get-imp-cars",authenticateToken,async(req,res)=>{
    try{
        const {id} = req.headers;
        const Data = await User.findById(id).populate({
            path: "cars",
            match:{important:true},
            options:{sort:{createdAt:-1}}
        }); 
        const impCarData = Data.cars;
        res.status(200).json({data:impCarData});
    }catch(error){
        console.log(error);
        return res.status(400).json({message:"Internal Server Error"});
    }
});


export default router;