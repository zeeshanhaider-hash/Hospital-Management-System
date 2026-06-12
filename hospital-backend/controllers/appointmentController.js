import Appointment from "../models/appointmentModel.js";
import Patient from "../models/patientModel.js";
import Doctor from "../models/doctorModel.js";
import User from "../models/userModel.js";
/* =========================
   CREATE APPOINTMENT
========================= */
export const createAppointmentController = async (req, res) => {
  try {
    const { doctor, date, time } = req.body;

    if (!doctor || !date || !time) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

    // 🔥 GET PATIENT PROFILE
    const patientProfile = await Patient.findOne({ user: req.user._id });

    if (!patientProfile) {
      return res.status(404).json({
        success: false,
        message: "Patient profile not found"
      });
    }

    // 🔥 CREATE APPOINTMENT
    const appointment = await Appointment.create({
      patient: patientProfile._id,
      doctor,
      date,
      time,
      status: "Pending"
    });

    res.status(201).json({
      success: true,
      message: "Appointment booked successfully",
      appointment
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

//  GET MY APPOINTMENTS (UPDATED)
export const getMyAppointments = async (req, res) => {
  try {
    const patientProfile = await Patient.findOne({ user: req.user._id });

    if (!patientProfile) {
      return res.status(404).json({
        success: false,
        message: "Patient not found"
      });
    }

    const appointments = await Appointment.find({
      patient: patientProfile._id
    })
      .populate({
        path: "doctor",
        populate: {
          path: "user",
          select: "name email"
        }
      })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      appointments
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* =========================
   GET ALL APPOINTMENTS (ADMIN)
========================= */


export const getAllAppointments = async (req, res) => {
  try {
    // Logic to fetch all appointments
    const appointments = await Appointment.find({})
      .populate("doctor", "name specialization") // Populate doctor ref
      .populate({
        path: "patient",
        populate: {
          path: "user", // Populate user ref inside patient ref
          select: "name" // Select only name for display
        }
      })
      .sort({ createdAt: -1 });

    // Return the array
    res.status(200).json({
      success: true,
      appointments
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/* =========================
   UPDATE STATUS (ADMIN)
========================= */
export const updateAppointmentStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Status updated",
      appointment
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/* =========================
   DELETE APPOINTMENT
========================= */
export const deleteAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found"
      });
    }

    await appointment.deleteOne();

    res.status(200).json({
      success: true,
      message: "Appointment deleted successfully"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};




/* =========================
   GET DOCTOR APPOINTMENTS
========================= */
export const getDoctorAppointments = async (req, res) => {
  try {
    // 1. Get the logged-in doctor's profile
    const doctorProfile = await Doctor.findOne({ user: req.user._id });
    
    if (!doctorProfile) {
      return res.status(404).json({ success: false, message: "Doctor profile not found" });
    }

    // 2. Find all appointments where this doctor is assigned
    const appointments = await Appointment.find({ doctor: doctorProfile._id })
      .populate({
        path: "patient",
        populate: {
          path: "user",
          select: "name email"
        }
      })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      appointments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// =========================
// DOCTOR UPDATE APPOINTMENT STATUS
// =========================
export const updateAppointmentStatusByDoctor = async (req, res) => {
  try {
    const { status } = req.body; // Expected: 'Approved' or 'Rejected'

    // Find the appointment
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found"
      });
    }

    // Update the status
    appointment.status = status;
    await appointment.save();

    res.status(200).json({
      success: true,
      message: `Appointment ${status} successfully`,
      appointment
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};