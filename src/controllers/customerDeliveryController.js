import {
  deliveryValidator,
  deliveryIdValidator,
  deliveryStatusValidator,
  orderByValidator,
} from "../validators/deliveryValidator.js";
import {
  createDelivery,
  customerCancelDelivery,
  customerHistory,
} from "../services/deliveryService.js";

export const custCreateDelivery = async (req, res) => {
  try {
    const {
      productName,
      productDescription,
      productImage,
      productCategory,
      pickupAddress,
      deliveryAddress,
      paymentType,
      price,
      quantity,
    } = req.body;

    const customerId = req.customer.id;

    const validateDelivery = deliveryValidator.safeParse({
      productName,
      productDescription,
      productImage,
      productCategory,
      pickupAddress,
      deliveryAddress,
      paymentType,
      price,
      quantity,
    });

    if (!validateDelivery.success) {
      return res.status(400).json({
        success: false,
        message: "Validation Failed",
        error: validateDelivery.error.issues[0].message,
      });
    }

    const result = await createDelivery({
      productName,
      productDescription,
      productImage,
      productCategory,
      pickupAddress,
      deliveryAddress,
      paymentType,
      price,
      quantity,
      customerId: customerId,
    });

    return res.status(201).json({
      success: true,
      message: "Delivery created successfully",
      data: result.data,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.statusCode ? error.message : "Internal Server Error",
      error: error.message,
    });
  }
};

export const custCancelDelivery = async (req, res) => {
  try {
    const { deliveryId } = req.body;
    const customerId = req.customer.id;

    const validateDelivery = deliveryIdValidator.safeParse({ deliveryId });

    if (!validateDelivery.success) {
      return res.status(400).json({
        success: false,
        message: "Validation Failed",
        error: validateDelivery.error.issues[0].message,
      });
    }

    const { data } = await customerCancelDelivery({
      deliveryId,
      customerId,
    });

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

export const custHistory = async (req, res) => {
  try {
    const customerId = req.customer.id;

    const { deliveryStatus, orderBy } = req.query;

    // VALIDATE DELIVERY STATUS AND ORDER BY

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

    const { data } = await customerHistory({
      customerId,
      deliveryStatus,
      orderBy,
    });

    return res.status(200).json({
      success: true,
      message: "Customer history retrieved successfully",
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
