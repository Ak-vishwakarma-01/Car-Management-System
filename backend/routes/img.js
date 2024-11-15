import express from "express";
import Image from "../models/image.js";
import Car from "../models/car.js";
import authenticateToken from "./auth.js";

const router = express.Router();

// Route to add an image to a specific car
router.post("/add-image/", authenticateToken, async (req, res) => {
    try {
        const { carId } = req.params;  
        const { imglink } = req.body;
        const userId = req.user.id;    

        
        const car = await Car.findOne({ _id: carId, user: userId });
        if (!car) {
            return res.status(403).json({ message: "You can only add images to your own cars." });
        }

        
        const newImage = new Image({ imglink: imglink });
        const savedImage = await newImage.save();

       
        car.images.push(savedImage._id);
        await car.save();

        res.status(200).json({ message: "Image added successfully" });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: "Internal Server Error" });
    }
});


router.delete("/delete-image/:id", authenticateToken, async (req, res) => {
    try {
        const { carId, imageId } = req.params;
        const userId = req.user.id;

        
        const car = await Car.findOne({ _id: carId, user: userId });
        if (!car) {
            return res.status(403).json({ message: "You can only delete images from your own cars." });
        }

        
        if (!car.images.includes(imageId)) {
            return res.status(404).json({ message: "Image not found in this car." });
        }

        
        car.images.pull(imageId);
        await car.save();

        await Image.findByIdAndDelete(imageId);

        res.status(200).json({ message: "Image deleted successfully" });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: "Internal Server Error" });
    }
});

export default router;
