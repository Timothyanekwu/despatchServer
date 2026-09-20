import express from "express";
import verifyCustomerToken from "../middlewares/verifyCustomerToken.js";
import {
  custCreateDelivery,
  custCancelDelivery,
  custHistory,
} from "../controllers/customerDeliveryController.js";

const customerDeliveryRoutes = express.Router();

// AUTHENTICATED ROUTES
customerDeliveryRoutes.use(verifyCustomerToken);

// CUSTOMER'S DELIVERY ROUTES
customerDeliveryRoutes.post("/create-delivery", custCreateDelivery);
customerDeliveryRoutes.patch("/cancel-delivery", custCancelDelivery);
customerDeliveryRoutes.get("/history", custHistory);

export default customerDeliveryRoutes;
