import express from "express";
import dotenv from "dotenv";
import Connection from "./db/conn.js"; // Ensure this path is correct based on your image
import cookieParser from "cookie-parser";
import cors from "cors";
import serverless from "serverless-http"; // Keep this for Vercel

// Import Routes
import doctorRouter from "./routes/doctorRoutes.js";
import patientRouter from "./routes/patientRoutes.js";
import appointmentRouter from "./routes/appointmentRoutes.js";
import userRouter from "./routes/userRoutes.js";

// Load Env Variables
dotenv.config();

const app = express();

/* MIDDLEWARE */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

/* CORS CONFIGURATION */
// IMPORTANT: process.env.FRONTEND_URL must be set in Vercel Dashboard
app.use(
  cors({
    origin: process.env.FRONTEND_URL, 
    credentials: true,
  })
);

/* ROUTES */
app.use("/api/v1/doctors", doctorRouter);
app.use("/api/v1/patients", patientRouter);
app.use("/api/v1/appointments", appointmentRouter);
app.use("/api/v1/users", userRouter);

/* TEST ROUTE */
app.get("/", (req, res) => {
  res.send("Hospital API is running successfully on Vercel!");
});

/* ============================================================
   VERCEL SERVERLESS HANDLER
   We wrap the app, but we MUST handle the DB connection carefully
   to avoid the 500 error.
============================================================ */
const handler = serverless(app);

// Export a wrapper that ensures DB connects before handling request
export default async (req, res) => {
  try {
    // 1. Connect to Database ONLY when a request comes in
    // This prevents the "Serverless Function Crashed" error on cold start
    await Connection(); 
    
    // 2. Handle the request
    return handler(req, res);
  } catch (error) {
    console.error("Serverless Error:", error);
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};