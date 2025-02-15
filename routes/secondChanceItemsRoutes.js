const express = require("express");
const multer = require("multer");
const { ObjectId } = require("mongodb");
const { client, connectToDatabase } = require("../models/db");

const router = express.Router();

// Connect to Database
connectToDatabase();

// Database Collection Reference
const db = client.db("SecondChanceDB");
const itemsCollection = db.collection("items");

// Configure File Upload with Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});
const upload = multer({ storage });

// ✅ **Get All Items**
router.get("/api/secondchance/items", async (req, res) => {
    try {
        const items = await itemsCollection.find().toArray();
        res.json(items);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// ✅ **Get a Single Item by ID**
router.get("/api/secondchance/items/:id", async (req, res) => {
    try {
        const item = await itemsCollection.findOne({ _id: new ObjectId(req.params.id) });
        if (!item) return res.status(404).json({ message: "Item not found" });
        res.json(item);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// ✅ **Create a New Item**
router.post("/api/secondchance/items", async (req, res) => {
    try {
        const newItem = {
            name: req.body.name,
            category: req.body.category,
            description: req.body.description,
            price: req.body.price,
            createdAt: new Date()
        };

        const result = await itemsCollection.insertOne(newItem);
        res.status(201).json({ message: "Item created successfully", itemId: result.insertedId });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// ✅ **Upload a File**
router.post("/api/secondchance/upload", upload.single("file"), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
    }
    res.json({ message: "File uploaded successfully", file: req.file });
});

// ✅ **Update an Item**
router.put("/api/secondchance/items/:id", async (req, res) => {
    try {
        const updatedItem = {
            $set: {
                name: req.body.name,
                category: req.body.category,
                description: req.body.description,
                price: req.body.price,
                updatedAt: new Date()
            }
        };

        const result = await itemsCollection.updateOne({ _id: new ObjectId(req.params.id) }, updatedItem);
        if (result.matchedCount === 0) return res.status(404).json({ message: "Item not found" });

        res.json({ message: "Item updated successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// ✅ **Delete an Item**
router.delete("/api/secondchance/items/:id", async (req, res) => {
    try {
        const result = await itemsCollection.deleteOne({ _id: new ObjectId(req.params.id) });
        if (result.deletedCount === 0) return res.status(404).json({ message: "Item not found" });

        res.json({ message: "Item deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
