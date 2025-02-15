const express = require("express");
const { connectDB } = require("./models/db"); // ✅ Ensure correct import

require("dotenv").config();

const app = express();

// Connect to MongoDB
connectDB();

app.use(express.json());
app.use(require("./routes/secondChanceItemsRoutes"));
app.use(require("./routes/searchRoutes"));
app.use(require("./routes/authRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
