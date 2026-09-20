import express from "express";
import { vehicleRegistrationController } from "../controllers/vehicleRegistController.js";
import verifyRiderToken from "../middlewares/verifyRiderToken.js";

const vehicleRegistrationRoutes = express.Router();

vehicleRegistrationRoutes.post(
  "/register",
  verifyRiderToken,
  vehicleRegistrationController,
);

export default vehicleRegistrationRoutes;
