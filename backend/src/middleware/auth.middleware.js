const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");

async function authMiddleware(req,res,next){
    

        const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

        if(!token){
            return res.status(401).json({message:"User not authenticated"});
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const user = await userModel.findById(decoded.userId); // mil gyi user id se user details
            req.user = user; // req object me user details add krdi
            return next(); // next middleware ya route handler pe jao


        } catch (error) {
            return res.status(401).json({message:"Unauthorized access, invalid token"});
        }
   
}

async function authSystemUserMiddleware(req,res,next) {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

    if(!token){
        return res.status(401).json({message:"User not authenticated"});
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await userModel.findById(decoded.userId).select("+systemUser"); 
        if(!user.systemUser) {
            return res.status(403).json({
                message:"Forbidden access, user is not a system user"
            })
        }
        req.user = user;
        return next();
    }
    catch(error){
        return res.status(401).json({message:"Unauthorized access, invalid token"});
    }
}

module.exports = authMiddleware;

//ye middleware har protected route pe use hoga. Ye token ko verify karega aur user details ko req object me add karega. Agar token valid h to next() call hoga aur request aage badhegi. Agar token invalid h to 401 status code ke sath error message return hoga.