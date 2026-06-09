import mongoose from "mongoose";

const Connection = async () => {
    try {
        const url = process.env.DB_URL;

        // 1. Check if already connected
        if (mongoose.connection.readyState === 1) {
            return; 
        }

        console.log("⏳ Connecting to MongoDB...");

        // 2. Connect with robust timeout settings
        await mongoose.connect(url, {
            serverSelectionTimeoutMS: 5000, // Stop trying to find server after 5s
            socketTimeoutMS: 45000,        // Close socket after 45s of no activity
            connectTimeoutMS: 10000,       // Give 10s to create connection
            family: 4,                     // Force IPv4 (sometimes fixes local network issues)
        });

        console.log("✅ MongoDB Connected Successfully");
    } catch (error) {
        console.log("❌ MongoDB Connection Failed:", error.message);
    }
}

export default Connection;