import "dotenv/config";
import { defineConfig } from "drizzle-kit";

const connectionString =
  process.env.DATABASE_URL || process.env.DB_CONNECTION_URI;

if (!connectionString) {
  throw new Error("DATABASE_URL is not set in .env");
}

const databaseUrl = new URL(connectionString);
const sslMode = databaseUrl.searchParams.get("sslmode");

// Mirror the exact SSL handling from src/db.js to prevent pg v8.23+ silent aborts
if (["prefer", "require", "verify-ca"].includes(sslMode)) {
  databaseUrl.searchParams.set("sslmode", "verify-full");
}

export default defineConfig({
  schema: "./src/models/*.js",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: databaseUrl.toString(),
  },
  verbose: true,
  strict: true,
});