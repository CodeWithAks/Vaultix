const express = require("express");

const { authMiddleware } = require("../middleware/auth.middleware");

const statsController = require("../controllers/stats.controller");

const router = express.Router();

/**
 * - GET /api/stats
 */
router.get(
    "/",
    authMiddleware,
    statsController.getStats
);

module.exports = router;