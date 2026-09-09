import express from "express";
import { customerLoginController, customerSignupController } from "../controllers/customerAuthController.js";


const customerAuthRoutes = express.Router();

customerAuthRoutes.post("/signup", customerSignupController);
customerAuthRoutes.post("/login", customerLoginController);

export default customerAuthRoutes;
