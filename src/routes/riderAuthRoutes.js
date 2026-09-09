import express from "express";
import { riderLoginController, riderSignupController } from "../controllers/riderAuthController.js";


const riderAuthRoutes = express.Router();

riderAuthRoutes.post("/signup", riderSignupController);
riderAuthRoutes.post("/login", riderLoginController);

export default riderAuthRoutes;
