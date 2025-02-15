const express = require("express");
const router = express.Router();
const connectToDatabase = require("../models/db");

// Connect to Database
connectToDatabase();

router.get("/", async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
