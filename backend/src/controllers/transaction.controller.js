const transactionModel = require("../models/transaction.model"); //isse transactions create hongi 
const ledgerModel = require("../models/ledger.model");  //isse ledger me entries hongi 
const emailService = require("../services/email.service"); //isse email notifications jayengi

/**
 * - Create a new transaction
 * 
 */

async function createTransaction(req, res) {
    // Step 1: Validate the transfer request
    const { fromAccount, toAccount, amount, idempotencyKey } = req.body;
}


//iss file mei hum transaction se related controllers define karenge 

