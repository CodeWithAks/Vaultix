const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Server is connected to DB");
    } catch (error) {
        console.log("Error connecting to DB:", error.message);
        process.exit(1);
    }
};

module.exports = connectDB;