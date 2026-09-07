const express = require("express");
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

// Mount feature routers here:
// router.use("/auth",   require("./auth.routes"));
// router.use("/users",  require("./user.routes"));
// router.use("/orders", require("./order.routes"));

module.exports = router;
