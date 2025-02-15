const express = require("express");
const router = express.Router();
const Item = require("../models/itemModel");

// Search by category
router.get("/api/secondchance/search", async (req, res) => {
  try {
    const { category } = req.query;
    if (!category) return res.status(400).json({ message: "Category required" });

    const items = await Item.find({ category });
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
