const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const { sendRegistrationEmail } = require("../services/email.service");
const tokenBlacklistModel = require("../models/blackList.model");
const accountModel = require("../models/account.model");
const cardModel = require("../models/card.model");

//POST method api-> /api/auth/register
async function userRegisterController(req, res) {

    const { email, password, name } = req.body;

    const isEMailExists = await userModel.findOne({
        email: email
    })

    if (isEMailExists) {
        return res.status(422).json({
            message: "User already exists with email",
            status: "failed"
        })
    }

    const user = await userModel.create({
        email, password, name
    });

    await accountModel.create({
        user: user._id,
        status: "ACTIVE",
        currency: "INR",
    })

    try {
        await cardModel.create({
            user: user._id,
            cardType: "VISA",
            cardNumber: "**** " + Math.floor(1000 + Math.random() * 9000),
            balance: 0,
            status: "ACTIVE",
            expiryDate: "12/26",
        });
    } catch (err) {
        console.log("Card creation failed:", err.message);
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "3d" });

    res.cookie("token", token); //token ko cookies mei save kiya 

    res.status(201).json({
        user: {
            _id: user._id,            //data send krenge 
            email: user.email,
            name: user.name
        },
        token
    })

    await sendRegistrationEmail(user.email, user.name);

}

//POST method api-> /api/auth/login
async function userLoginController(req, res) {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email }).select("+password")

    if (!user) {
        return res.status(401).json({
            message: "Email or password is INVALID"
        })
    }

    const isValidPassword = await user.comparePassword(password);

    if (!isValidPassword) {
        return res.status(401).json({
            message: "Email or password is INVALID"
        })
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "3d" });
    res.cookie("token", token);

    res.status(200).json({
        user: {
            _id: user._id,
            email: user.email,
            name: user.name
        },
        token
    })
}

//POST method api-> /api/auth/logout
async function userLogoutController(req, res) {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(400).json({
            message: "Token is required for logout"
        })
    }

    res.cookie("token", "") // pehle yha se remove kya taki client side se bhi token remove ho jaye

    await tokenBlacklistModel.create({
        token: token //blacklist mei token add kar diya taki wo token future mei use na ho sake
    })

    res.status(200).json({
        message: "User logged out successfully"
    })
}




module.exports = { userRegisterController, userLoginController, userLogoutController };