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

async function getAccountBalanceController(req,res) {
    const {accountId} = req.params; //url se account id mil jayega

    const account = await accountModel.findOne({
        _id:accountId,
        user:req.user._id //kya ye wahi user ka account hai jo request kar raha hai
    }) 

    if(!account){
        return res.status(404).json({
            message:"Account not found"
        })
    }

    const balance = await account.getBalance(); //account model me getBalance method hai, usko call krke balance mil jayega

    res.status(200).json({
        accountId:account._id,
        balance:balance
    })
}

module.exports = {
    createAccountController,
    getAccountController,
    getAccountBalanceController
}