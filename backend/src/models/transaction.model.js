const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({  
    fromAccount: {
        type: mongoose.Schema.Types.ObjectId, //ye account collection ke object id ko reference karega
        ref: 'account',
        required: [true,"Transaction must be associated with a from account"],
        index:true
    },
    toAccount: {     
        type: mongoose.Schema.Types.ObjectId,
        ref: 'account',
        required: [true,"Transaction must be associated with a to account"],
        index:true
    },
    status: {
        type: String,
        enum: {
            values:['PENDING', 'COMPLETED', 'FAILED',"REVERSED"],
            message: 'Status must be either PENDING, COMPLETED, FAILED or REVERSED'
        },
        default: 'PENDING'
    },
    amount: {
        type: Number,
        required: [true,"Transaction amount is required"],  
        min: [0.01, "Transaction amount must be at least 0.01"]
    },
    idempotencyKey: {             //ek unique key hoga jo hr transaction ke sath aayega, isse hum ensure karenge ki same transaction multiple times process na ho
        type: String,
        required: [true,"Idempotency key is required for transaction"],
        unique: true
    }
}, { timestamps: true });

module.exports = mongoose.model('transaction', transactionSchema);

//ye transaction model hai jisme fromAccount, toAccount, status, amount aur idempotencyKey fields hain. isme se fromAccount aur toAccount account collection ke object id ko reference karte hain. status field me transaction ka status store hota hai jo PENDING, COMPLETED, FAILED ya REVERSED ho sakta hai. amount field me transaction amount store hota hai aur idempotencyKey field me ek unique key store hoti hai jo har transaction ke sath aati hai. timestamps option se createdAt aur updatedAt fields automatically add ho jati hain.