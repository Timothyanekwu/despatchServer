import express from "express";
import { signupController, loginController } from "../controllers/authController.js";


const authRoutes = express.Router();



authRoutes.post("/signup", signupController);
authRoutes.post("/login", loginController);

export default authRoutes;
