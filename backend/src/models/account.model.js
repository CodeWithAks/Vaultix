const mongoose = require("mongoose");
const ledgerModel = require("./ledger.model");


const accountSchema = new mongoose.Schema({
    user: {                                       //that ye acc. kis user se belong krta h 
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User ID is required"],
        index: true                                //taaki searching fast ho 
    },
    status: {
        type: String,
        enum: {
            values: ["ACTIVE", "FROZEN", "CLOSED"],
            message: "Status must be either ACTIVE, FROZEN, or CLOSED",
        },
        default: "ACTIVE"
    },
    currency: {
        type: String,
        required: [true, "Currency is required for creating an account"],
        default: "INR"
    }
}, {
    timestamps: true
});

accountSchema.index({ user: 1, status: 1 }); // 2 field pe create kiya -> compound index

// Implementation for getting account balance
accountSchema.methods.getBalance = async function () {  //ye method ledger entries ko aggregate karke account balance calculate karega

    const balanceData = await ledgerModel.aggregate([
        { $match: { account: this._id } }, //unn entries ko dhundo jinki id iss partiular account se match ho 

        {
            $group: {
                _id: null,
                totalDebit: {
                    $sum: {
                        $cond: [
                            { $eq: ["$type", "DEBIT"] },
                            "$amount", //agr type DEBIT h to amount ko add krdo
                            0 //vrna 0 add kro
                        ]
                    }
                },
                totalCredit: {
                    $sum: {
                        $cond: [
                            { $eq: ["$type", "CREDIT"] },   
                            "$amount", 
                            0 
                        ]
                    }
                }
            },
        },
        {
                $project: {
                    _id: 0,
                    balance: { $subtract: ["$totalCredit", "$totalDebit"] } //balance calculate krne ke liye total credit me se total debit ko subtract krdo
                }
            }
    ]);

    if(balanceData.length > 0) {
        return 0 //agr balanceData empty h to 0 return krdo
    }

    return balanceData[0].balance; 

};

const accountModel = mongoose.model("account", accountSchema);

module.exports = accountModel;

