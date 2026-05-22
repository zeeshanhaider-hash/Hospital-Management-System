// models/appointmentModel.js (UPDATED)
import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
  patient: {  // Changed from 'user' to 'patient'
    type: mongoose.Schema.ObjectId,
    ref: "Patient",
    required: true
  },

  doctor: {
    type: mongoose.Schema.ObjectId,
    ref: "Doctor",
    required: true
  },

  date: {
    type: Date,
    required: true
  },

  time: {
    type: String,
    required: true
  },

  status: {
    type: String,
    enum: ["Pending", "Approved", "Rejected", "Completed"],  // Added enum
    default: "Pending"
  }
}, { timestamps: true });

const Appointment = mongoose.model("Appointment", appointmentSchema);
export default Appointment;