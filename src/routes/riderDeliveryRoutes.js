import express from "express";
import verifyRiderToken from "../middlewares/verifyRiderToken.js";
import {
  riderAcceptDelivery,
  cancelDelivery,
  riderConfirmPickup,
  riderDeliveredProduct,
  history,
  getPendingDeliveries,
  getVehicles,
} from "../controllers/riderDeliveryController.js";

const riderDeliveryRoutes = express.Router();

// AUTHENTICATED ROUTES
riderDeliveryRoutes.use(verifyRiderToken);

// DESPATCH RIDER'S ROUTES
riderDeliveryRoutes.get("/pending-deliveries", getPendingDeliveries);
riderDeliveryRoutes.patch("/accept-delivery", riderAcceptDelivery);
riderDeliveryRoutes.patch("/confirm-pickup", riderConfirmPickup);
riderDeliveryRoutes.patch("/delivered-product", riderDeliveredProduct);
riderDeliveryRoutes.patch("/cancel-delivery", cancelDelivery);
riderDeliveryRoutes.get("/history", history);
riderDeliveryRoutes.get("/get-vehicles", getVehicles);

export default riderDeliveryRoutes;
