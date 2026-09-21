import {
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
  getDespatchVehicles,
} from "../services/deliveryService.js";

export const getPendingDeliveries = async (req, res) => {
  try {
    const { orderBy } = req.query;

    if (orderBy) {
      const validateOrderBy = orderByValidator.safeParse(orderBy);
      if (!validateOrderBy.success) {
        return res.status(400).json({
          success: false,
          message: "Validation Failed",
          error: validateOrderBy.error.issues[0].message,
        });
      }
    }

    const riderId = req.rider?.id;
    if (!riderId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized access",
      });
    }

    const { data } = await pendingDeliveries({ orderBy });

    return res.status(200).json({
      success: true,
      message: "Pending deliveries retrieved successfully",
      data,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.statusCode ? error.message : "Internal Server Error",
      error: error.message,
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

    if (!validateBody.success) {
      return res.status(400).json({
        success: false,
        message: "Validation Failed",
        error: validateBody.error.issues[0].message,
      });
    }

    const riderId = req.rider?.id;
    if (!riderId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized access",
      });
    }

    const { data } = await acceptDelivery({ deliveryId, vehicleId, riderId });

    return res.status(200).json({
      success: true,
      message: "Delivery accepted successfully",
      data,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.statusCode ? error.message : "Internal Server Error",
      error: error.message,
    });
  }
};

export const riderConfirmPickup = async (req, res) => {
  try {
    const { deliveryId } = req.body;

    const validateBody = deliveryIdValidator.safeParse({ deliveryId });

    if (!validateBody.success) {
      return res.status(400).json({
        success: false,
        message: "Validation Failed",
        error: validateBody.error.issues[0].message,
      });
    }

    const riderId = req.rider?.id;
    if (!riderId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized access",
      });
    }

    const { data } = await confirmPickup({ deliveryId, riderId });

    return res.status(200).json({
      success: true,
      message: "Delivery pickup confirmed successfully",
      data,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.statusCode ? error.message : "Internal Server Error",
      error: error.message,
    });
  }
};

export const riderDeliveredProduct = async (req, res) => {
  try {
    const { deliveryId } = req.body;

    const validateBody = deliveryIdValidator.safeParse({ deliveryId });

    if (!validateBody.success) {
      return res.status(400).json({
        success: false,
        message: "Validation Failed",
        error: validateBody.error.issues[0].message,
      });
    }

    const riderId = req.rider?.id;
    if (!riderId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized access",
      });
    }

    const { data } = await deliveredProduct({ deliveryId, riderId });

    return res.status(200).json({
      success: true,
      message: "Delivery delivered successfully",
      data,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.statusCode ? error.message : "Internal Server Error",
      error: error.message,
    });
  }
};

export const cancelDelivery = async (req, res) => {
  try {
    const { deliveryId } = req.body;

    const validateBody = deliveryIdValidator.safeParse({ deliveryId });

    if (!validateBody.success) {
      return res.status(400).json({
        success: false,
        message: "Validation Failed",
        error: validateBody.error.issues[0].message,
      });
    }

    const riderId = req.rider?.id;
    if (!riderId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized access",
      });
    }

    const { data } = await riderCancelDelivery({ deliveryId, riderId });

    return res.status(200).json({
      success: true,
      message: "Delivery cancelled successfully",
      data,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.statusCode ? error.message : "Internal Server Error",
      error: error.message,
    });
  }
};

export const history = async (req, res) => {
  try {
    const riderId = req.rider?.id;
    if (!riderId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized access",
      });
    }

    const { deliveryStatus, orderBy } = req.query;

    if (deliveryStatus) {
      const validateStatus = deliveryStatusValidator.safeParse(deliveryStatus);
      if (!validateStatus.success) {
        return res.status(400).json({
          success: false,
          message: "Validation Failed",
          error: validateStatus.error.issues[0].message,
        });
      }
    }

    if (orderBy) {
      const validateOrderBy = orderByValidator.safeParse(orderBy);
      if (!validateOrderBy.success) {
        return res.status(400).json({
          success: false,
          message: "Validation Failed",
          error: validateOrderBy.error.issues[0].message,
        });
      }
    }

    const { data } = await riderHistory({
      riderId,
      deliveryStatus,
      orderBy,
    });

    return res.status(200).json({
      success: true,
      message: "Rider history retrieved successfully",
      data,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.statusCode ? error.message : "Internal Server Error",
      error: error.message,
    });
  }
};

export const getVehicles = async (req, res) => {
  try {
    const riderId = req.rider?.id;
    if (!riderId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized access",
      });
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
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.statusCode ? error.message : "Internal Server Error",
      error: error.message,
    });
  }
};
