const crypto = require("crypto");

const ledgerModel = require("../models/ledger.model");
const accountModel = require("../models/account.model");
const transactionModel = require("../models/transaction.model");

async function addDemoMoney(req, res) {

    try {

        // Only you can access
        if (req.user.email !== "meakshara.goyal@gmail.com") {
            return res.status(403).json({
                message: "Unauthorized"
            });
        }

        // Find logged-in user's account
        const account = await accountModel.findOne({
            user: req.user._id
        });

        if (!account) {
            return res.status(404).json({
                message: "Account not found"
            });
        }

        // Create SYSTEM transaction
        const transaction = await transactionModel.create({
            fromAccount: null,
            toAccount: account._id,
            amount: 10000,
            idempotencyKey: crypto.randomUUID(),
            status: "COMPLETED"
        });

        // Create CREDIT ledger entry
        await ledgerModel.create({
            account: account._id,
            amount: 10000,
            transaction: transaction._id,
            type: "CREDIT"
        });

        return res.status(200).json({
            message: "₹10000 added successfully"
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            message: "Failed to add money",
            error: error.message
        });

    }

}

module.exports = { addDemoMoney };