const {Router} = require('express');



const transactionRoutes = Router();

/**
 * - POST /api/transaction/create - Create a new transaction
 */
transactionRoutes.post("/",authMiddleware.authMiddleware,transactionController.createTransaction) 


/**
 *- POST /api/transactions/system/initial-funds
 * - Create initial funds transaction from system user 
 */
transactionRoutes.post("/system/initial-funds",authMiddleware.authMiddleware,transactionController.createInitialFundsTransaction)





module.exports = transactionRoutes;

//ye file me hum transaction se related routes define karenge. Jaise ki create transaction, get transactions, update transaction, delete transaction etc. Ye routes protected honge, isliye hum authMiddleware ko use karenge.