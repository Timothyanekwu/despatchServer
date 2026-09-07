require("dotenv/config");

const { drizzle } = require("drizzle-orm/node-postgres");
const { Pool } = require("pg");

const connectionString = process.env.DATABASE_URL || process.env.DB_CONNECTION_URI;

if (!connectionString) {
  throw new Error("DATABASE_URL is not defined");
}

const pool = new Pool({
  connectionString,
  connectionTimeoutMillis: 10000,
});
const db = drizzle(pool);

module.exports = { db, pool };
