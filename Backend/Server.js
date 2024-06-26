import express from "express";
import dotenv from "dotenv";
import connectDB from "./DB/connectDB.js"
import cookieParser from "cookie-parser";
import userRoutes from "./Routes/UserRoutes.js";
import PostRoutes from "./Routes/PostRoutes.js";
import {v2 as cloudinary} from "cloudinary"
 
dotenv.config();
connectDB();


const app=express();
cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET

})
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cookieParser());

app.use("/api/users",userRoutes);
app.use("/api/posts",PostRoutes);
const PORT =process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`Server Started at local host ${PORT}`)
})