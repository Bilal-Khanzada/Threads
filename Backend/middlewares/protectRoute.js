import User from "../Models/UserModel.js";
import jwt from "jsonwebtoken"

const protectRoute=async(req,res,next)=>{
    try{
        const token=req.cookies.jwt;
        if(!token) return res.status(401).json({message:"Unauthorized"})
        const decoded=jwt.verify(token,process.env.JWT_secret);
        const user=await User.findById(decoded.userId);
        req.user=user;
        next();
    }
    catch(error){
        res.status(500).json({message:error.message});
        console.log("Error in sinupUser:", error.message)
    }
}
export default protectRoute;