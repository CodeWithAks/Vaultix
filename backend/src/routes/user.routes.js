const express = require("express");
const router = express.Router();

const { searchUsers } = require("../controllers/user.controller");

const {authMiddleware} = require("../middleware/auth.middleware");

/**
 * GET /users/search?query=""
 */
router.get("/search",authMiddleware,searchUsers);

module.exports = router;