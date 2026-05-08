const mongoose = require('mongoose');

const tokenBlacklistSchema = new mongoose.Schema({
    token:{
        type: String,
        required: [true,'Token is required to be added to the blacklist'],
        unique: [true,'Token already exists']
    },
    blacklistedAt:{
        type: Date,
        default: Date.now,
        immutable: true
    }
},{
    timestamps: true
}) 

tokenBlacklistSchema.index({createdAt: 1}, {
    expireAfterSeconds: 60 * 60 * 24 * 3 //expires after 3 days
})

const tokenBlacklistModel = mongoose.model('TokenBlacklist', tokenBlacklistSchema);

module.exports = tokenBlacklistModel;

