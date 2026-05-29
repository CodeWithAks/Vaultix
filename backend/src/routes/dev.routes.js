const express = require("express");

const router = express.Router();

const { addDemoMoney } = require("../controllers/dev.controller");

const { authMiddleware } = require("../middleware/auth.middleware");

router.post("/add-money",authMiddleware,addDemoMoney);

module.exports = router;