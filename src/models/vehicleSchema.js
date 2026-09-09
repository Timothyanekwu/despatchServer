import { pgTable, pgEnum,  uuid, serial, text, timestamp, integer, boolean, varchar } from "drizzle-orm/pg-core";
import { rider } from "./riderSchema.js"
import { relations } from "drizzle-orm";


export const vehicleType = pgEnum("vehicleType", ["BICYCLE", "BIKE", "CAR", "VAN", "TRUCK", "TRAILER", "BUS"]);
export const goodsType = pgEnum("goodsType", ["GROCERIES", "FOOD", "BEVERAGES", "ELECTRONICS", "CLOTHING", "PHARMACEUTICALS", "DOCUMENT", "OTHER"]);


export const vehicle = pgTable("vehicle", {
    id: uuid("id").defaultRandom().primaryKey(),
    riderId: uuid("riderId").references(() => rider.id),
    vehicleType: vehicleType("vehicleType").notNull(),
    goodsType: goodsType("goodsType").notNull(),
    selfie: text("selfie").notNull(),
    vehicleImage: text("vehicleImage").notNull(),
    licenseImage: text("licenseImage").notNull(),
    plateNumber: varchar("plateNumber", { length: 255 }).notNull(),
    vehicleModel: varchar("vehicleModel", { length: 255 }).notNull(),

    isApproved: boolean("isApproved").default(false).notNull(),
    rejectionReason: text("rejectionReason"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const vehicleRelations = relations(vehicle, ({ one }) => ({
  rider: one(rider, {
    fields: [vehicle.riderId],
    references: [rider.id],
  }),
}));