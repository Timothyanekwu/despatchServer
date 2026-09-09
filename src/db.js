import "dotenv/config";

import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as riderSchema from "./models/riderSchema.js";
import * as vehicleSchema from "./models/vehicleSchema.js";
import * as customerSchema from "./models/customerSchema.js";


const { Pool } = pg;

const connectionString = process.env.DATABASE_URL || process.env.DB_CONNECTION_URI;

if (!connectionString) {
  throw new Error("DATABASE_URL is not defined");
}

const databaseUrl = new URL(connectionString);
const sslMode = databaseUrl.searchParams.get("sslmode");

// Preserve pg's current secure behavior before its SSL mode defaults change.
if (["prefer", "require", "verify-ca"].includes(sslMode)) {
  databaseUrl.searchParams.set("sslmode", "verify-full");
}

const pool = new Pool({
  connectionString: databaseUrl.toString(),
  connectionTimeoutMillis: 10000,
});
const db = drizzle(pool, {
  schema: { ...riderSchema, ...vehicleSchema, ...customerSchema },
});

export { db, pool };
export default db;
