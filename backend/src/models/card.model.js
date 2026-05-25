const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: true,
        },

        cardType: {
            type: String,
            enum: ["VISA", "MASTERCARD"],
            default: "VISA"
        },

        cardNumber: {
            type: String,
            required: true,
            unique: true,
        },

        balance: {
            type: Number,
            default: 0,
        },

        status: {
            type: String,
            enum: ["ACTIVE", "FROZEN"],
            default: "ACTIVE",
        },

        expiryDate: {
            type: String,
            default: "12/26",
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("card", cardSchema);
    