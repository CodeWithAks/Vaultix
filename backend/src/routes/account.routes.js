const express = require("express");
const {authMiddleware} = require("../middleware/auth.middleware");
const accountController = require("../controllers/account.controller");

const router = express.Router(); 

/**
 * -POST /api/accounts/
 * - Create a new account for the authenticated user
 */
router.post("/",authMiddleware,accountController.createAccountController);


/**
 * - GET /api/accounts/
 * - Get account details for the authenticated user
 */
router.get("/",authMiddleware,accountController.getAccountController); 


/**
 * - GET /api/accounts/balance/:accountId
 * - Get account balance for the specified account ID, ensuring the user is authenticated and authorized to access that account 
 */
router.get("/balance",authMiddleware,accountController.getAccountBalanceController)

module.exports = router;