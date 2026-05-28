const userModel = require("../models/user.model");

async function searchUsers(req, res) {
  try {
    // frontend se query uthao
    const { query } = req.query;

    // agar empty hai
    if (!query) {
      return res.status(400).json({
        message: "Query is required"
      });
    }

    // MongoDB search
    const users = await userModel.find({
      $or: [
        {
          name: {
            $regex: query,
            $options: "i"
          }
        },
        {
          email: {
            $regex: query,
            $options: "i"
          }
        }
      ]
    }).select("name email");

    return res.status(200).json(users);

  } catch (error) {

    return res.status(500).json({
      message: "Search failed",
      error: error.message
    });

  }
}

module.exports = {
  searchUsers
};