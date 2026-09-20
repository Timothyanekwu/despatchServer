import { db } from "../db.js";
import { delivery } from "../models/deliverySchema.js";
import { and, eq, or, desc, asc } from "drizzle-orm";
import { vehicle } from "../models/vehicleSchema.js";

// CUSTOMER'S OPERATION
export const createDelivery = async ({
  productName,
  productDescription,
  productImage,
  productCategory,
  pickupAddress,
  deliveryAddress,
  deliveryStatus,
  paymentType,
  price,
  quantity,
  customerId,
}) => {
  // DATABASE OPERATION
  const [createdDelivery] = await db
    .insert(delivery)
    .values({
      productName,
      productDescription,
      productImage,
      productCategory,

      pickupAddress,
      deliveryAddress,
      deliveryStatus,

      paymentType,
      price,
      quantity,

      customerId,
    })
    .returning();

  return {
    data: createdDelivery,
  };
};

// DESPATCH RIDER'S OPERATION
export const pendingDeliveries = async ({ orderBy }) => {
  // DATABASE OPERATION
  const pendingDeliveries = await db
    .select()
    .from(delivery)
    .where(eq(delivery.deliveryStatus, "Pending"))
    .orderBy(() => {
      const order = orderBy ? orderBy : "latest";

      switch (order) {
        case "priceAsc":
          return asc(delivery.price);
        case "priceDesc":
          return desc(delivery.price);
        case "latest":
          return desc(delivery.createdAt);
        case "oldest":
          return asc(delivery.createdAt);
      }
    });

  if (pendingDeliveries.length < 1) {
    throw new Error("No pending deliveries");
  }

  return {
    data: pendingDeliveries,
  };
};

// DESPATCH RIDER'S OPERATION
export const acceptDelivery = async ({ deliveryId, riderId, vehicleId }) => {
  // VALIDATE THIS VEHICLE
  const validVehicle = await db.query.vehicle.findFirst({
    where: (v, { eq, and }) =>
      and(eq(v.id, vehicleId), eq(v.riderId, riderId), eq(v.isApproved, true)),
  });

  if (!validVehicle) {
    throw new Error("Invalid or unapproved vehicle selected");
  }

  // DATABASE OPERATION
  const [acceptedDelivery] = await db
    .update(delivery)
    .set({
      deliveryStatus: "Accepted",
      riderId,
      vehicleId,
    })
    .where(
      and(eq(delivery.id, deliveryId), eq(delivery.deliveryStatus, "Pending")),
    )
    .returning();

  if (!acceptedDelivery) {
    throw new Error("Delivery not found or already accepted");
  }

  return {
    data: acceptedDelivery,
  };
};

// DESPATCH RIDER'S OPERATION: Once accepted, the rider can confirm the pickup of the product from the customer
export const confirmPickup = async ({ deliveryId, riderId }) => {
  // DATABASE OPERATION
  const [pickupConfirmed] = await db
    .update(delivery)
    .set({
      deliveryStatus: "In_transit",
    })
    .where(
      and(
        eq(delivery.id, deliveryId),
        eq(delivery.riderId, riderId),
        eq(delivery.deliveryStatus, "Accepted"),
      ),
    )
    .returning();

  if (!pickupConfirmed) {
    throw new Error("Delivery not assigned to you or not in accepted state");
  }

  return {
    data: pickupConfirmed,
  };
};

// DESPATCH RIDER'S OPERATION
export const deliveredProduct = async ({ deliveryId, riderId }) => {
  // DATABASE OPERATION
  const [deliveredProduct] = await db
    .update(delivery)
    .set({ deliveryStatus: "Delivered" })
    .where(
      and(
        eq(delivery.id, deliveryId),
        eq(delivery.riderId, riderId),
        eq(delivery.deliveryStatus, "In_transit"),
      ),
    )
    .returning();

  if (!deliveredProduct) {
    throw new Error("Delivery not found or already delivered");
  }

  return {
    data: deliveredProduct,
  };
};

// CUSTOMER'S OPERATION
export const customerCancelDelivery = async ({ deliveryId, customerId }) => {
  // DATABASE OPERATION
  const [cancelledDelivery] = await db
    .update(delivery)
    .set({ deliveryStatus: "Cancelled" })
    .where(
      and(
        eq(delivery.id, deliveryId),
        eq(delivery.customerId, customerId),
        or(
          eq(delivery.deliveryStatus, "Pending"),
          eq(delivery.deliveryStatus, "Accepted"),
          eq(delivery.deliveryStatus, "In_transit"),
        ),
      ),
    )
    .returning();

  if (!cancelledDelivery) {
    throw new Error("Delivery not found or cannot be cancelled");
  }

  return {
    data: cancelledDelivery,
  };
};

// DESPATCH RIDER'S OPERATION
export const riderCancelDelivery = async ({ deliveryId, riderId }) => {
  // DATABASE OPERATION
  const [cancelledDelivery] = await db
    .update(delivery)
    .set({ deliveryStatus: "Pending", riderId: null, vehicleId: null })
    .where(
      and(
        eq(delivery.id, deliveryId),
        eq(delivery.riderId, riderId),
        or(
          eq(delivery.deliveryStatus, "Accepted"),
          eq(delivery.deliveryStatus, "In_transit"),
        ),
      ),
    )
    .returning();

  if (!cancelledDelivery) {
    throw new Error("Delivery not found or not assigned to you");
  }

  return {
    data: cancelledDelivery,
  };
};

// CUSTOMER'S OPERATION
export const customerHistory = async ({
  customerId,
  deliveryStatus,
  orderBy,
}) => {
  // DATABASE OPERATION
  const conditions = [eq(delivery.customerId, customerId)];

  if (deliveryStatus) {
    conditions.push(eq(delivery.deliveryStatus, deliveryStatus));
  }

  const customerHistory = await db
    .select()
    .from(delivery)
    .where(and(...conditions))
    .orderBy(() => {
      const order = orderBy ? orderBy : "latest";

      switch (order) {
        case "priceAsc":
          return asc(delivery.price);
        case "priceDesc":
          return desc(delivery.price);
        case "latest":
          return desc(delivery.createdAt);
        case "oldest":
          return asc(delivery.createdAt);
      }
    });

  if (customerHistory.length < 1) {
    throw new Error("No delivery placed yet");
  }

  return {
    data: customerHistory,
  };
};

// DESPATCH RIDER'S OPERATION
export const riderHistory = async ({ riderId, deliveryStatus, orderBy }) => {
  // DATABASE OPERATION
  const conditions = [eq(delivery.riderId, riderId)];

  if (deliveryStatus) {
    conditions.push(eq(delivery.deliveryStatus, deliveryStatus));
  }

  const riderHistory = await db
    .select()
    .from(delivery)
    .where(and(...conditions))
    .orderBy(() => {
      const order = orderBy ? orderBy : "latest";

      switch (order) {
        case "priceAsc":
          return asc(delivery.price);
        case "priceDesc":
          return desc(delivery.price);
        case "latest":
          return desc(delivery.createdAt);
        case "oldest":
          return asc(delivery.createdAt);
      }
    });

  if (riderHistory.length < 1) {
    throw new Error("No delivery assigned yet");
  }

  return {
    data: riderHistory,
  };
};

// DESPATCH RIDER'S OPERATION
export const getDespatchVehicles = async ({ riderId }) => {
  const vehicles = await db
    .select()
    .from(vehicle)
    .where(eq(vehicle.riderId, riderId));

  if (vehicles.length < 1) {
    return {
      success: false,
      message: "No vehicles found",
    };
  }

  return {
    success: true,
    data: vehicles,
  };
};
