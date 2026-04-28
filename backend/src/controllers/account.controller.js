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

async function getAccountController(req,res) {

    const accounts = await accountModel.find({user:req.user._id}); //id se user ka account mil jayega
    res.status(200).json({
        accounts 
    })
}

module.exports = {
    createAccountController,
    getAccountController
}