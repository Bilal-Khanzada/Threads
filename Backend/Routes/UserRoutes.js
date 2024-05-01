import express from "express";
import { Router } from "express";
import { signupUser,loginUser,logoutUser,FollowUnFollowUser,updateUser,getUserProfile } from "../Controllers/UserController.js";
import protectRoute from "../middlewares/protectRoute.js";


const router =express.Router();
router.get("/profile/:username",getUserProfile)
router.post("/signup", signupUser);
router.post("/login", loginUser);
router.post("/logout",logoutUser);
router.post("/follow/:id",protectRoute,FollowUnFollowUser);
router.put("/update/:id",protectRoute,updateUser)

export default router;