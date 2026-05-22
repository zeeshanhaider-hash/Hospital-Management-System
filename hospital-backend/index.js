import express from "express";
import dotenv from "dotenv";
import Connection from "./db/conn.js";
import cookieParser from "cookie-parser";
import cors from "cors"

// ONLY HOSPITAL ROUTES
import doctorRouter from "./routes/doctorRoutes.js";
import patientRouter from "./routes/patientRoutes.js";
import appointmentRouter from "./routes/appointmentRoutes.js";
import { userProfileController } from "./controllers/userController.js";
import userRouter from "./routes/userRoutes.js";




dotenv.config();

const app = express();

/* MIDDLEWARE */
app.use(express.json()); 
// 2. URL Parser
app.use(express.urlencoded({ extended: true }));
// 3. Cookie Parser
app.use(cookieParser());
 
// ⬇️ CORS CONFIG ⬇️
app.use(cors({
  origin: true, 
  credentials: true
}));
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

/* SERVER */
const port = process.env.PORT;

if (!process.env.SECRET_KEY || !process.env.PORT) {
  console.error("Missing required env vars");
  process.exit(1);
}

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});