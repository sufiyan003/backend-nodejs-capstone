require("dotenv").config();
const express = require("express");
const connectDB = require("./models/db");

const app = express();

// Connect to MongoDB (Ensure only once)
connectDB();

app.use(express.json());

// Define Routes
app.use("/api/secondchance/items", require("./routes/secondChanceItemsRoutes"));
app.use("/api/secondchance/search", require("./routes/searchRoutes"));
app.use("/api/secondchance/auth", require("./routes/authRoutes"));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
