const transactionModel = require("../models/transaction.model"); //isse transactions create hongi 
const ledgerModel = require("../models/ledger.model");  //isse ledger me entries hongi 
const emailService = require("../services/email.service"); //isse email notifications jayengi
const mongoose = require("mongoose");
const accountModel = require("../models/account.model");
const userModel = require("../models/user.model");

/**
 * - Create a new transaction
 * THE 10-STEP TRANSFER FLOW:
     * 1. Validate request
     * 2. Validate idempotency key
     * 3. Check account status
     * 4. Derive sender balance from ledger
     * 5. Create transaction (PENDING)
     * 6. Create DEBIT ledger entry
     * 7. Create CREDIT ledger entry
     * 8. Mark transaction COMPLETED
     * 9. Commit MongoDB session
     * 10. Send email notification
 */


async function createTransaction(req, res) {
    const { toAccount, amount, idempotencyKey } = req.body;
    const fromAccount = req.user.account; //yeh middleware se aayega, jismein user authentication ke baad apne account details attach karenge request object pe, taki hum yahan use kar sakein

    /**
     * 1. Validate request
     */
    if (!fromAccount || !toAccount || !amount || !idempotencyKey) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    /**
     * 2. Fetch accounts
     */
    try {
        const fromUserAccount = await accountModel.findOne({
            user: req.user._id
        });
        const toUser = await userModel.findOne({ email: toAccount });

        if (!toUser) {
            return res.status(400).json({ message: "User not found" });
        }

        const toUserAccount = await accountModel.findOne({
            user: toUser?._id
        });

        if (!fromUserAccount) {
            return res.status(400).json({ message: "Sender account not found" });
        }

        if (!toUserAccount) {
            return res.status(400).json({ message: "Receiver account not found" });
        }


        /**
         * 3. Validate idempotency key - check if a transaction with the same idempotency key already exists
         */
        const existingTx = await transactionModel.findOne({ idempotencyKey });

        if (existingTx) {
            return res.status(200).json({
                message: "Transaction already processed",
                transaction: existingTx
            });
        }


        /**
         * 4. Check account status
         */
        if (fromUserAccount.status !== "ACTIVE" || toUserAccount.status !== "ACTIVE") {
            return res.status(400).json({
                message: "Accounts must be ACTIVE"
            });
        }


        /**        
         * 5. Check if the fromAccount has sufficient balance
         */
        const balance = await fromUserAccount.getBalance();

        if (balance < amount) {
            return res.status(400).json({
                message: "Insufficient balance"
            });
        }

        /**
         * 6. Start MongoDB session(DB transaction) for atomicity - ensures that all operations either succeed or fail together
         */
        const session = await mongoose.startSession();
        session.startTransaction();

        let transaction;


        /**
         * 7. Create transaction (PENDING)
         */
        try {
            transaction = await transactionModel.create([{
                fromAccount: fromUserAccount._id,
                toAccount: toUserAccount._id,
                amount,
                idempotencyKey,
                status: "PENDING"
            }], { session });

            transaction = transaction[0];

            /**
             * 8. Create DEBIT ledger entry
             */
            const debitLedgerEntry = await ledgerModel.create([{
                account: fromUserAccount._id,
                amount,
                transaction: transaction._id,
                type: "DEBIT"
            }], { session });

            // await new Promise((resolve) =>
            //     setTimeout(resolve, 100 * 1000)
            // );

            /**
             * 9. Create CREDIT ledger entry
             */
            const creditLedgerEntry = await ledgerModel.create([{
                account: toUserAccount._id,
                amount,
                transaction: transaction._id,
                type: "CREDIT"
            }], { session });

            /**
             * 10. Mark transaction as COMPLETED
             */
            transaction.status = "COMPLETED";
            await transaction.save({ session });

            /**
             * 11. Commit the transaction
             */
            await session.commitTransaction();
            session.endSession();


            res.status(201).json({
                message: "Transaction successful",
                transaction
            });

            emailService.sendTransactionEmail(
                req.user.email,
                req.user.name,
                amount,
                toUser.email
            ).catch(console.error);

            emailService.sendTransactionEmail(
                toUser.email,
                toUser.name,
                amount,
                req.user.email
            ).catch(console.error);

            return;


        } catch (error) {
            console.error(error);
            /**
             * Rollback DB transaction in case of error
             */
            await session.abortTransaction();
            session.endSession();

            return res.status(500).json({
                message: "Transaction failed",
                error: error.message
            });
        }

    } catch (error) {
        console.error(error);
        /**
         * Global error handling for unforeseen errors
         */
        return res.status(500).json({
            message: "Something went wrong",
            error: error.message
        });
    }
}


/**
 * Get transactions for the authenticated user's account
 */
async function getTransactions(req, res) {
    try {
        const transactions = await transactionModel.find({
            $or: [
                { fromAccount: req.user.account }, //dono transactions fetch hongi, jisme user sender hoga ya receiver hoga
                { toAccount: req.user.account }
            ]
        }).populate({
            path: "fromAccount",
            populate: {
                path: "user",
                select: "name email"
            }
        })
            .populate({
                path: "toAccount",
                populate: {
                    path: "user",
                    select: "name email"
                }
            }).sort({ createdAt: -1 }); //ismein transactions ko descending order me sort karenge, taki latest transaction pehle aaye

        // return res.status(200).json(transactions);
        return res.status(200).json({
            transactions,
            currentAccount: req.user.account
        });
    } catch (error) {
        console.error("Error fetching transactions:", error);
        return res.status(500).json({
            message: "Failed to fetch transactions",
            error: error.message
        });
    }
}


module.exports = { createTransaction, getTransactions };






