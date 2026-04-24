const transactionModel = require("../models/transaction.model"); //isse transactions create hongi 
const ledgerModel = require("../models/ledger.model");  //isse ledger me entries hongi 
const emailService = require("../services/email.service"); //isse email notifications jayengi
const mongoose = require("mongoose");
const accountModel = require("../models/account.model"); 

/**
 * - Create a new transaction
 * 
 */

async function createTransaction(req, res) {
    // Step 1: Validate the transfer request
    const { fromAccount, toAccount, amount, idempotencyKey } = req.body;
}

async function createInitialFundsTransaction(req, res) {  //ye system user k liye h jo initial funds transfer karega
    const { toAccount, amount, idempotencyKey } = req.body;

    if(!toAccount || !amount || !idempotencyKey) {
        return res.status(400).json({message:"Missing required fields"});
    }

    const toUserAccount = await accountModel.findOne({ _id: toAccount }); //user real b h ya ni ?
    if(!toUserAccount) {
        return res.status(404).json({message:"To account not found"});
    }

    const fromUserAccount = await accountModel.findOne({     //system user ka account mil gya ?
        systemUser: true,
        user:req.user._id
     }); 


    if(!fromUserAccount) {   
        return res.status(500).json({message:"System user account not found"});
    }

    //ab trasnaction create krni h 
    const session = await mongoose.startSession();
    session.startTransaction();

    const transaction = new transactionModel({
        fromAccount: fromUserAccount._id,
        toAccount: toUserAccount._id,
        amount,
        idempotencyKey,
        status:"PENDING",
    });

    //ab ledger entry create krenge
    const debitLedgerEntry = await ledgerModel.create([{ 
        account: fromUserAccount._id,
        amount,
        transaction: transaction._id,
        type:"DEBIT"
    }], { session });   //agr session hoga to data array ki format mei dena hoga

    const creditLedgerEntry = await ledgerModel.create([{
        account:toUserAccount._id,
        amount,
        transaction: transaction._id,
        type:"CREDIT"
    }], { session });

    transaction.status = "COMPLETED";

    await transaction.save({ session });

    await session.commitTransaction();
    session.endSession();

    return res.status(201).json({
        message:"Initial funds transaction created successfully", 
        transactionId: transaction._id
    });
}


module.exports = { createTransaction, createInitialFundsTransaction };

//iss file mei hum transaction se related controllers define karenge 

