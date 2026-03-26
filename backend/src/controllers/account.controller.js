const accountModel = require("../models/account.model");

async function createAccountController(req,res) {

    const user = req.user; // auth middleware se aari h 

    const account = await accountModel.create({
        user:user._id
    })

    res.status(201).json({
        message:"Account created successfully",
        account //account details return krdi response me
    })
}

module.exports = {
    createAccountController
}