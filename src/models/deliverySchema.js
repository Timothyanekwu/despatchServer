import {
  pgTable,
  uuid,
  serial,
  text,
  timestamp,
  integer,
  boolean,
  varchar,
  pgEnum,
} from "drizzle-orm/pg-core";
import { customer } from "./customerSchema.js";
import { vehicle } from "./vehicleSchema.js";
import { rider } from "./riderSchema.js";

export const deliveryStatus = pgEnum("deliveryStatus", [
  "Pending",
  "Accepted",
  "In_transit",
  "Delivered",
  "Cancelled",
]);
export const productCategory = pgEnum("productCategory", [
  "GROCERIES",
  "FOOD",
  "BEVERAGES",
  "ELECTRONICS",
  "CLOTHING",
  "PHARMACEUTICALS",
  "DOCUMENT",
  "OTHER",
]);
export const paymentType = pgEnum("paymentType", ["ONLINE", "COD"]);

export const delivery = pgTable("delivery", {
  id: uuid("id").defaultRandom().primaryKey(),
  customerId: uuid("customerId").references(() => customer.id),
  riderId: uuid("riderId").references(() => rider.id),
  vehicleId: uuid("vehicleId").references(() => vehicle.id),

  productName: varchar("productName", { length: 255 }).notNull(),
  productDescription: text("productDescription"),
  productImage: text("productImage").notNull(),
  productCategory: productCategory("productCategory").notNull(),

  pickupAddress: text("pickupAddress").notNull(),
  deliveryAddress: text("deliveryAddress").notNull(),
  deliveryStatus: deliveryStatus("deliveryStatus").default("Pending"),

  price: integer("price").notNull(),
  paymentType: paymentType("paymentType").notNull(),
  quantity: integer("quantity").default(1),

  createdAt: timestamp("created_at").defaultNow().notNull(),
});
