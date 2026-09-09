import express from "express";

const router = express.Router();

/**
 * Health-check / root route
 * GET /api
 */
router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Despatch API is running 🚀",
  });
});

// Mount feature routers below:


export default router;
