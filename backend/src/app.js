//server k instance ko create krna and server ko config krna

const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

/**
 * - Routes required
 */
const authRouter = require("./routes/auth.route");
const accountRouter = require("./routes/account.routes");
const transactionRoutes = require("./routes/transaction.routes");
const analyticsRoutes = require("./routes/analytics.routes");

const app = express();

/**
 * - Middlewares
 */
app.use(cors({
    origin: "http://localhost:5173", 
    credentials: true, // Allow cookies to be sent with requests
}))

app.use(express.json());
app.use(cookieParser());

/**
 * - Use Routes
 */
app.use("/api/auth",authRouter);
app.use("/api/accounts",accountRouter);
app.use("/api/transactions",transactionRoutes);
app.use("/api/analytics",analyticsRoutes);
module.exports = app;