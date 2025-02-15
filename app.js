require("dotenv").config();
const express = require("express");
const connectToDatabase = require("./models/db");

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to Database
connectToDatabase();

// Middleware
app.use(express.json());

// Routes
app.use("/api/secondchance/items", require("./routes/secondChanceItemsRoutes"));
app.use("/api/secondchance/search", require("./routes/searchRoutes"));

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
