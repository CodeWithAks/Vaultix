const { Router } = require("express");

const { authMiddleware } = require("../middleware/auth.middleware");

const cardController = require("../controllers/card.controller");

const cardRoutes = Router();

/**
 * - GET /api/cards
 * - Get all cards for authenticated user
 */
cardRoutes.get("/",authMiddleware,cardController.getCards);

module.exports = cardRoutes;