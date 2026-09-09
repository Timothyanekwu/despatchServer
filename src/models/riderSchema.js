import { pgTable, uuid, serial, text, timestamp, integer, boolean, varchar } from "drizzle-orm/pg-core";

export const rider = pgTable("rider", {
    id: uuid("id").defaultRandom().primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    email: text("email").notNull().unique(),
    phoneNumber: varchar("phone_number", { length: 15 }).notNull(),
    address: text("address").notNull(),
    password: varchar("password", { length: 255 }).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});