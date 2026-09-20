import {
  deliveryValidator,
  orderByValidator,
  acceptDeliveryValidator,
  deliveryIdValidator,
  deliveryStatusValidator,
} from "../validators/deliveryValidator.js";
import {
  acceptDelivery,
  confirmPickup,
  deliveredProduct,
  riderCancelDelivery,
  riderHistory,
  pendingDeliveries,
} from "../services/deliveryService.js";
import { getDespatchVehicles } from "../services/deliveryService.js";

export const getPendingDeliveries = async (req, res) => {
  try {
    const { orderBy } = req.query;

    if (orderBy) {
      const validateOrderBy = orderByValidator.safeParse(orderBy);
      if (!validateOrderBy.success) {
        throw new Error(validateOrderBy.error.issues[0].message);
      }
    }

    const riderId = req.rider.id;

    if (!riderId) {
      throw new Error("Unauthorized access!");
    }

    const { data } = await pendingDeliveries({ orderBy });

    return res.status(200).json({
      success: true,
      message: "Pending deliveries retrieved successfully",
      data,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const riderAcceptDelivery = async (req, res) => {
  try {
    const { deliveryId, vehicleId } = req.body;

    const validateBody = acceptDeliveryValidator.safeParse({
      deliveryId,
      vehicleId,
    });

    console.log("VALIDATE", validateBody.success);
    if (!validateBody.success) {
      throw new Error(validateBody.error.issues[0].message);
    }

    const riderId = req.rider.id;

    if (!riderId) {
      throw new Error("Unauthorized access!");
    }

    const delivery = await acceptDelivery({ deliveryId, vehicleId, riderId });

    return res.status(200).json({
      success: true,
      message: "Delivery accepted successfully",
      data: delivery,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const riderConfirmPickup = async (req, res) => {
  try {
    const { deliveryId } = req.body;

    const validateBody = deliveryIdValidator.safeParse({ deliveryId });

    if (!validateBody.success) {
      throw new Error(validateBody.error.issues[0].message);
    }

    const riderId = req.rider.id;

    if (!riderId) {
      throw new Error("Unauthorized access!");
    }

    const delivery = await confirmPickup({ deliveryId, riderId });

    return res.status(200).json({
      success: true,
      message: "Delivery pickup confirmed successfully",
      data: delivery,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const riderDeliveredProduct = async (req, res) => {
  try {
    const { deliveryId } = req.body;

    const validateBody = deliveryIdValidator.safeParse({ deliveryId });

    if (!validateBody.success) {
      throw new Error(validateBody.error.issues[0].message);
    }

    const riderId = req.rider.id;

    if (!riderId) {
      throw new Error("Unauthorized access!");
    }

    const delivery = await deliveredProduct({ deliveryId, riderId });

    return res.status(200).json({
      success: true,
      message: "Delivery delivered successfully",
      data: delivery,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const cancelDelivery = async (req, res) => {
  try {
    const { deliveryId } = req.body;

    const validateBody = deliveryIdValidator.safeParse({ deliveryId });

    if (!validateBody.success) {
      throw new Error(validateBody.error.issues[0].message);
    }

    const riderId = req.rider.id;

    if (!riderId) {
      throw new Error("Unauthorized access!");
    }

    const delivery = await riderCancelDelivery({ deliveryId, riderId });

    return res.status(200).json({
      success: true,
      message: "Delivery cancelled successfully",
      data: delivery,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const history = async (req, res) => {
  try {
    const riderId = req.rider.id;

    const { deliveryStatus, orderBy } = req.query;

    // VALIDATE DELIVERY STATUS AND ORDER BY

    if (deliveryStatus) {
      const validateStatus = deliveryStatusValidator.safeParse(deliveryStatus);
      if (!validateStatus.success) {
        throw new Error(validateStatus.error.issues[0].message);
      }
    }

    if (orderBy) {
      const validateOrderBy = orderByValidator.safeParse(orderBy);
      if (!validateOrderBy.success) {
        throw new Error(validateOrderBy.error.issues[0].message);
      }
    }

    const riderDeliveries = await riderHistory({
      riderId,
      deliveryStatus,
      orderBy,
    });

    return res.status(200).json({
      success: true,
      message: "Rider history retrieved successfully",
      data: riderDeliveries.data,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getVehicles = async (req, res) => {
  try {
    const riderId = req.rider.id;

    if (!riderId) {
      throw new Error("Unauthorized access!");
    }

    const vehicles = await getDespatchVehicles({ riderId });

    if (!vehicles.success) {
      return res.status(404).json({
        success: false,
        message: vehicles.message,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Vehicles retrieved successfully",
      data: vehicles.data,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
