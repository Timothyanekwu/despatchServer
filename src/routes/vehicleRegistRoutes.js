import express from "express";
import { vehicleRegistrationController } from "../controllers/vehicleRegistController.js";
import verifyToken from "../middlewares/tokenMiddleware.js";

const vehicleRegistrationRoutes = express.Router();

vehicleRegistrationRoutes.post("/register", verifyToken, vehicleRegistrationController);


export default vehicleRegistrationRoutes;
