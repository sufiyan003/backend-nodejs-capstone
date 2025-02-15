const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(require("./routes/secondChanceItemsRoutes"));
app.use(require("./routes/searchRoutes"));

app.listen(5000, () => console.log("🚀 Server running on port 5000"));
