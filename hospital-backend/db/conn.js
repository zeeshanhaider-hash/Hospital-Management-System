import mongoose from "mongoose";

const Connection = async () => {
    try {
        // Check if already connected to avoid reconnecting on every request
        if (mongoose.connection.readyState >= 1) {
            return;
        }

        const url = process.env.DB_URL;
        
        await mongoose.connect(url, {
            // These options are required for newer MongoDB drivers
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log("✅ MongoDB Connected Successfully");
    } catch (error) {
        console.log("❌ MongoDB Connection Error:", error.message);
    }
}

export default Connection;