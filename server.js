require("dotenv").config();

const express = require("express");
const cors = require("cors");

const { connectDB } = require("./src/config/db");
const routes = require("./src/routes");
const notFound = require("./src/middlewares/notFound");
const errorHandler = require("./src/middlewares/errorHandler");

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

// ──────────────────────────────────────────
// Routes
// ──────────────────────────────────────────
app.use("/api", routes);

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
