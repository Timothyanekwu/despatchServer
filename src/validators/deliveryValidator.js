import { z } from "zod";

export const deliveryStatuses = [
  "Pending",
  "Accepted",
  "In_transit",
  "Delivered",
  "Cancelled",
];

export const productCategories = [
  "GROCERIES",
  "FOOD",
  "BEVERAGES",
  "ELECTRONICS",
  "CLOTHING",
  "PHARMACEUTICALS",
  "DOCUMENT",
  "OTHER",
];

export const paymentTypes = ["ONLINE", "COD"];

const nonEmptyString = (message) => z.string().trim().min(1, { message });

export const deliveryValidator = z.object({
  productName: nonEmptyString("Product name is required"),
  productDescription: z.string().optional(),
  productImage: nonEmptyString("Product image is required"),
  productCategory: z.enum(productCategories),

  pickupAddress: nonEmptyString("Pickup address is required"),
  deliveryAddress: nonEmptyString("Delivery address is required"),
  deliveryStatus: z.enum(deliveryStatuses).default("Pending"),

  paymentType: z.enum(paymentTypes),
  price: z.number().int().positive(),
  quantity: z.number().int().positive().default(1),
});

export const deliveryIdValidator = z.object({
  deliveryId: z.uuid(),
});

export const acceptDeliveryValidator = deliveryIdValidator.extend({
  vehicleId: z.uuid(),
});

export const deliveryStatusValidator = z.enum(deliveryStatuses);

export const orderByValidator = z.enum(
  ["priceAsc", "priceDesc", "latest", "oldest"],
  "Invalid order by option",
);
