const transactionModel = require("../models/transaction.model"); //isse transactions create hongi 
const ledgerModel = require("../models/ledger.model");  //isse ledger me entries hongi 
const emailService = require("../services/email.service"); //isse email notifications jayengi
const mongoose = require("mongoose");
const accountModel = require("../models/account.model");

/**
 * - Create a new transaction
 * THE 10-STEP TRANSFER FLOW : 
 * 1. Validate the transfer request (amount, fromAccount, toAccount, idempotencyKey)
 * 2. Check if the fromAccount has sufficient balance
 * 3. Create a new transaction with status "PENDING"
 * 4. Create a debit ledger entry for the fromAccount
 * 5. Create a credit ledger entry for the toAccount
 * 6. Update the transaction status to "COMPLETED"
 * 7. Commit the transaction
 * 8. Send email notifications to both parties
 * 9. Handle errors and rollback if necessary
 * 10. Return the transaction details in the response
 */

async function createTransaction(req, res) {
    // Step 1: Validate the transfer request
    const { fromAccount, toAccount, amount, idempotencyKey } = req.body;

    /**
     * 1. Validate the request
     */
    if (!fromAccount || !toAccount || !amount || !idempotencyKey) {
        return res.status(400).json({ message: "Missing required fields" });
    }
}

async function createInitialFundsTransaction(req, res) {  //ye system user k liye h jo initial funds transfer karega
    const { toAccount, amount, idempotencyKey } = req.body;

    if (!toAccount || !amount || !idempotencyKey) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    const toUserAccount = await accountModel.findOne({ _id: toAccount }); //user real b h ya ni ?
    if (!toUserAccount) {
        return res.status(404).json({ message: "To account not found" });
    }

    const fromUserAccount = await accountModel.findOne({     //system user ka account mil gya ?
        systemUser: true,
        user: req.user._id
    });

    if (!fromUserAccount || !toUserAccount) { //kya pta id glt di ho ya account delete ho gya ho
        return res.status(404).json({ message: "From or To account not found" });
    }


    if (!fromUserAccount) {
        return res.status(500).json({ message: "System user account not found" });
    }


    /**
     * 2. Validate idempotency key - check if a transaction with the same idempotency key already exists
     */
    const isTransactionAlreadyExists = await transactionModel.findOne({
        idempotencyKey: idempotencyKey //same to nhi h ? 
    });

    if(isTransactionAlreadyExists) { 
        if(isTransactionAlreadyExists.status === "COMPLETED") { 
            return res.status(200).json({
                message: "Transaction already completed",
                transaction: isTransactionAlreadyExists
            });
        }

        if(isTransactionAlreadyExists.status === "PENDING") {
            return res.status(200).json({
                message: "Transaction is still pending",
            });
        }

        if(isTransactionAlreadyExists.status === "FAILED") {
            return res.status(500).json({
                message: "Transaction already failed",
            });
        }

        if(isTransactionAlreadyExists.status === "REVERSED") {
            return res.status(200).json({
                message: "Transaction was reversed, please retry",
            });
        }
    }


    /**
     * 3. Check Account Status
     */
    
    if(fromUserAccount.status !== "ACTIVE" || toUserAccount.status !== "ACTIVE") {
        return res.status(400).json({ 
            message: "One or both accounts are not active"
         });
    }

    /**
     * 4. Check if the fromAccount has sufficient balance
     */

    const fromAccountBalance = await fromUserAccount.getBalance(); 

    if(fromAccountBalance < amount) {
        return res.status(400).json({
            message: `Insufficient balance. Current balance is ${fromAccountBalance}. Requested amount is ${amount}`
         });
    }

    /**
     * 5. Create a new transaction with status "PENDING"
     */
    const session = await mongoose.startSession();
    session.startTransaction(); //ye hum isiley taaki agr iske baad koi error aata h to hum transaction ko rollback kar sakein, aur data consistency bani rahe


    const transaction = new transactionModel({
        fromAccount: fromUserAccount._id,
        toAccount: toUserAccount._id,
        amount,
        idempotencyKey,
        status: "PENDING",
    });

     await transaction.save({ session });

    /**
     * 6. Create ledger entries
     */
    const debitLedgerEntry = await ledgerModel.create([{
        account: fromUserAccount._id,
        amount,
        transaction: transaction._id,
        type: "DEBIT"
    }], { session });   //agr session hoga to data array ki format mei dena hoga

    const creditLedgerEntry = await ledgerModel.create([{
        account: toUserAccount._id,
        amount,
        transaction: transaction._id,
        type: "CREDIT"
    }], { session });

    transaction.status = "COMPLETED";

    await transaction.save({ session });

    await session.commitTransaction();
    session.endSession();

    /**
     * 6. Send email notifications to both parties
     */
    await emailService.sendTransactionEmail(req.user.email, req.user.name, amount, toUserAccount._id); 

    return res.status(201).json({
        message: "Transaction created successfully",
        transactionId: transaction._id
    });


    // return res.status(201).json({
    //     message: "Initial funds transaction created successfully",
    //     transactionId: transaction._id
    // });
}


module.exports = { createTransaction, createInitialFundsTransaction };

//iss file mei hum transaction se related controllers define karenge 

