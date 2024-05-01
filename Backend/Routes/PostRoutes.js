import express from "express";
import { Router } from "express";
import { createpost } from "../Controllers/PostController.js";
import protectRoute from "../middlewares/protectRoute.js";


const router=express.Router();
router.post("/create",protectRoute,createpost)


export default router