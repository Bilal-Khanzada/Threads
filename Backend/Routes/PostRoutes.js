import express from "express";
import { Router } from "express";
import { createpost } from "../Controllers/PostController.js";
import protectRoute from "../middlewares/protectRoute.js";
import { getFeedPosts } from "../Controllers/PostController.js"


const router=express.Router();
router.get("/feed", protectRoute, getFeedPosts);



export default router