const {Router} = require('express');



const transactionRoutes = Router();

/**
 * - POST /api/transaction/create - Create a new transaction
 */
transactionRoutes.post("/create",) 







module.exports = transactionRoutes;

//ye file me hum transaction se related routes define karenge. Jaise ki create transaction, get transactions, update transaction, delete transaction etc. Ye routes protected honge, isliye hum authMiddleware ko use karenge.