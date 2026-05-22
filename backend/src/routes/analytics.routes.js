const express = require("express");
const { authMiddleware } = require("../middleware/auth.middleware");
const analyticsController = require("../controllers/analytics.controller");

const router = express.Router();

/**
 * - GET /api/analytics/monthly-spending
 */
router.get("/monthly-spending", authMiddleware, analyticsController.getMonthlySpending);

module.exports = router;
