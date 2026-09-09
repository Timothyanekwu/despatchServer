import { pool } from "../db.js";

const connectDB = async () => {
  try {
    await pool.query("SELECT 1");
    console.log("PostgreSQL connected");
  } catch (error) {
    console.error(`PostgreSQL connection error: ${error.message}`);
    await pool.end();
    process.exit(1);
  }
};

export { connectDB, pool };