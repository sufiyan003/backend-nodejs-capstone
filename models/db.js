const { MongoClient } = require("mongodb");
require("dotenv").config(); // Load environment variables

const uri = process.env.MONGODB_URI; // ✅ Ensure this variable is set in .env

if (!uri) {
    throw new Error("MONGODB_URI is not defined in environment variables.");
}

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function connectToDatabase() {
    try {
        await client.connect();
        console.log("✅ Connected to MongoDB");
    } catch (error) {
        console.error("❌ MongoDB Connection Error:", error.message);
        process.exit(1); // Exit if connection fails
    }
}

module.exports = { client, connectToDatabase };
