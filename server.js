import "dotenv/config";

import express from "express";
import cors from "cors";

import { connectDB } from "./src/config/db.js";
import routes from "./src/routes/index.js";
import notFound from "./src/middlewares/notFound.js";
import errorHandler from "./src/middlewares/errorHandler.js";
import riderAuthRoutes from "./src/routes/riderAuthRoutes.js";
import customerAuthRoutes from "./src/routes/customerAuthRoutes.js";
import vehicleRegistrationRoutes from "./src/routes/vehicleRegistRoutes.js";


// ──────────────────────────────────────────
// Initialise Express app
// ──────────────────────────────────────────
const app = express();

// ──────────────────────────────────────────
// Global middleware
// ──────────────────────────────────────────
app.use(cors()); // Cross-origin requests
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Request logger middleware (runs for all incoming requests)
app.use((req, res, next) => {
  res.on("finish", () => {
    console.log(`${req.method} ${req.originalUrl} - ${res.statusCode}`);
  });
  next();
});

// ──────────────────────────────────────────
// Routes
// ──────────────────────────────────────────
app.use("/api/v1", routes);
app.use("/api/v1/auth/rider", riderAuthRoutes);
app.use("/api/v1/auth/customer", customerAuthRoutes);
app.use("/api/v1/vehicle", vehicleRegistrationRoutes);
// ──────────────────────────────────────────
// Error handling
// ──────────────────────────────────────────
app.use(notFound);
app.use(errorHandler);

// ──────────────────────────────────────────
// Start server
// ──────────────────────────────────────────
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`🚀 Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
  });
};

startServer();

