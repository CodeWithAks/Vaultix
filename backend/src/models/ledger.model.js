const mongoose = require('mongoose');

const ledgerSchema = new mongoose.Schema({
    account: {               //kis account se debit ya credit ho raha hai
        type: mongoose.Schema.Types.ObjectId,
        ref: 'account',
        required: [true,"Ledger entry must be associated with an account"],
        index:true,
        immutable: true
    },
    amount: {
        type: Number,
        required: [true,"Ledger entry amount is required"],
        immutable: true
    },
    transaction: {                 //ye ledger entry kis transaction se associated h
        type: mongoose.Schema.Types.ObjectId,
        ref: 'transaction',
        required: [true,"Ledger entry must be associated with a transaction"],
        index:true,
        immutable: true
    },
    type: {           
        type: String,
        enum: {
            values:['DEBIT', 'CREDIT'],
            message: 'Ledger entry type must be either DEBIT or CREDIT'
        },
        required: [true,"Ledger entry type is required"],
        immutable: true
    }
});

function preventLedgerModification() {
    throw new Error("Ledger entries cannot be modified or deleted");
};

// ledgerSchema.pre('updateOne', preventLedgerModification);
ledgerSchema.pre('deleteOne', preventLedgerModification);
ledgerSchema.pre('findOneAndUpdate', preventLedgerModification);
ledgerSchema.pre('findOneAndDelete', preventLedgerModification);
// ledgerSchema.pre('save',preventLedgerModification);
// ledgerSchema.pre('updateMany', preventLedgerModification);
ledgerSchema.pre('deleteMany', preventLedgerModification);
ledgerSchema.pre('findOneAndReplace', preventLedgerModification);

module.exports = mongoose.model('ledger', ledgerSchema);

