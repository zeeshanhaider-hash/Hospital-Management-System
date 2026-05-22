import express from "express";
import {
  createAppointmentController,
  getMyAppointments,
  getAllAppointments,
  updateAppointmentStatus,
  deleteAppointment,
  getDoctorAppointments,
  updateAppointmentStatusByDoctor
} from "../controllers/appointmentController.js";
import { isAuthenticatedUser, isAdmin } from "../utils/userAuth.js";

const appointmentRouter = express.Router();

// USER ROUTES
appointmentRouter.post("/create", isAuthenticatedUser, createAppointmentController);

// ✅ GET MY APPOINTMENTS
appointmentRouter.get("/my", isAuthenticatedUser, getMyAppointments);

// ✅ GET DOCTOR APPOINTMENTS (Fixed Syntax: removed extra //)
appointmentRouter.get("/doctor-appointments", isAuthenticatedUser, isAdmin("doctor"), getDoctorAppointments);

// ADMIN ROUTES
// ✅ ADMIN ROUTE (Must be here)
// 
appointmentRouter.put("/admin/update/:id", isAuthenticatedUser, isAdmin, updateAppointmentStatus);
appointmentRouter.get("/admin/all", isAuthenticatedUser, isAdmin("admin"), getAllAppointments);
appointmentRouter.put("/admin/update/:id", isAuthenticatedUser, isAdmin("admin"), updateAppointmentStatus);
appointmentRouter.delete("/admin/delete/:id", isAuthenticatedUser, isAdmin("admin"), deleteAppointment);

export default appointmentRouter; // ✅ Export name matches import in index.js