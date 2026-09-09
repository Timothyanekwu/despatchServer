import express from "express";
import { vehicleRegistrationController } from "../controllers/vehicleRegistController.js";
import verifyToken from "../middlewares/verifyRiderToken.js";

const vehicleRegistrationRoutes = express.Router();

vehicleRegistrationRoutes.post("/register", verifyToken, vehicleRegistrationController);


export default vehicleRegistrationRoutes;
