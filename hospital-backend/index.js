import express from "express";
import dotenv from "dotenv";
import Connection from "../db/conn.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import serverless from "serverless-http";

// ROUTES
import doctorRouter from "../routes/doctorRoutes.js";
import patientRouter from "../routes/patientRoutes.js";
import appointmentRouter from "../routes/appointmentRoutes.js";
import userRouter from "../routes/userRoutes.js";

dotenv.config();

const app = express();

/* MIDDLEWARE */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

/* CORS */
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

/* DATABASE */
Connection();

/* ROUTES */
app.use("/api/v1/doctors", doctorRouter);
app.use("/api/v1/patients", patientRouter);
app.use("/api/v1/appointments", appointmentRouter);
app.use("/api/v1/users", userRouter);

/* TEST ROUTE */
app.get("/", (req, res) => {
  res.send("Hospital API is running");
});

/* EXPORT FOR VERCEL */
export const handler = serverless(app);