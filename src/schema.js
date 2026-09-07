const { pgTable, serial, text, timestamp, integer, boolean, varchar } = require("drizzle-orm/pg-core");

// Define your Drizzle schemas below
// Example:
// const users = pgTable("users", {
//   id: serial("id").primaryKey(),
//   email: text("email").notNull().unique(),
//   createdAt: timestamp("created_at").defaultNow().notNull(),
// });

module.exports = {};