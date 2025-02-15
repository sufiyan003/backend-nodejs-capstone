const express = require("express");
const { client } = require("../models/db");

const router = express.Router();
const db = client.db("SecondChanceDB");
const itemsCollection = db.collection("items");

router.get("/api/secondchance/search", async (req, res) => {
    const { category } = req.query;

    try {
        const results = await itemsCollection.find({ category }).toArray();
        res.json(results);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
