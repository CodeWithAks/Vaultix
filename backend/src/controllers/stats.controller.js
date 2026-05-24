const transactionModel = require("../models/transaction.model");

async function getStats(req, res) {

    try {

        // income
        const incomeResult = await transactionModel.aggregate([
            {
                $match: {
                    toAccount: req.user.account,
                    status: "COMPLETED"
                }
            },
            {
                $group: {
                    _id: null,
                    totalIncome: {
                        $sum: "$amount"
                    }
                }
            }
        ]);

        // expenses
        const expenseResult = await transactionModel.aggregate([
            {
                $match: {
                    fromAccount: req.user.account,
                    status: "COMPLETED"
                }
            },
            {
                $group: {
                    _id: null,
                    totalExpenses: {
                        $sum: "$amount"
                    }
                }
            }
        ]);

        const income =
            incomeResult[0]?.totalIncome || 0;

        const expenses =
            expenseResult[0]?.totalExpenses || 0;

        const savings = income - expenses;

        return res.status(200).json({
            income,
            expenses,
            savings
        });

    } catch (error) {

        console.error("Stats Error:", error);

        return res.status(500).json({
            message: "Failed to fetch stats",
            error: error.message
        });
    }
}

module.exports = {
    getStats
};