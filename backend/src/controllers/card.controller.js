const cardModel = require("../models/card.model.js");

async function getCards(req,res) {
    try{
        const cards = await cardModel.find({
            user: req.user._id //sirf logged-in user k cards
        });

        return res.status(200).json(cards)
    } catch(error) {
        return res.status(500).json({
            message: "Failed to fetch cards",
            error: error.message
        });
    }
}


module.exports = { getCards };