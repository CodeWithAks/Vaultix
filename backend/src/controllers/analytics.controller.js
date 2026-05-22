const transactionModel = require('../models/transaction.model');

async function getMonthlySpending(req, res) {
    try {
        const currentYear = new Date().getFullYear();
        const monthlyData = await transactionModel.aggregate([
            {
                $match: { // Filter transactions for the current user and completed status
                    fromAccount: req.user.account, //user ka account number
                    status: "COMPLETED",

                    createdAt: {
                        $gte: new Date(`${currentYear}-01-01`), // ye 
                        $lte: new Date(`${currentYear}-12-31`)
                    }
                }
            },
            {
                $group: {
                    _id: { $month: "$createdAt" }, //id will be month number (1-12)
                    totalSpending: {
                        $sum: "$amount" //sum of amount for each month
                    }
                }
            },

            {
                $sort: {
                    _id: 1 //sort by month ascending
                }
            }

        ]);

        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        const formattedData = monthlyData.map(item => ({
            month: monthNames[item._id - 1],
            spending: item.totalSpending
        }));

        return res.status(200).json({
            analytics: formattedData
        });

    } catch (error) {
        console.error("Analytics Error:", error);
        res.status(500).json({ message: "Failed to fetch monthly spending" });
    }
}

module.exports = {
    getMonthlySpending
}