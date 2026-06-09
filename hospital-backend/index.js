import express from "express";
import dotenv from "dotenv";
import Connection from "./db/conn.js";
import cookieParser from "cookie-parser";
import cors from "cors";

import doctorRouter from "./routes/doctorRoutes.js";
import patientRouter from "./routes/patientRoutes.js";
import appointmentRouter from "./routes/appointmentRoutes.js";
import userRouter from "./routes/userRoutes.js";

dotenv.config();

const app = express();

/* MIDDLEWARE */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

/* CORS */
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  credentials: true,
}));

/* ROUTES */
app.use("/api/v1/doctors", doctorRouter);
app.use("/api/v1/patients", patientRouter);
app.use("/api/v1/appointments", appointmentRouter);
app.use("/api/v1/users", userRouter);

/* TEST ROUTE */
app.get("/", (req, res) => {
  res.send("Hospital API is running!");
});

/* LOCAL SERVER START */
const PORT = process.env.PORT || 3000;

Connection()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`✅ Server running at http://localhost:${PORT}`);
      console.log(`🚀 API at http://localhost:${PORT}/api/v1`);
    });
  })
  .catch((err) => {
    console.error("❌ DB Connection Failed:", err.message);
  });

/* VERCEL EXPORT */
export default app;