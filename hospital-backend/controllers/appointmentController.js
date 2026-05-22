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
    // 1. Destructure query params for pagination (default to page 1, limit 10)
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;

    // 2. Execute query with pagination
    const appointments = await Appointment.find()
      .select("-__v")
      .populate("doctor", "name specialization")
      .populate({
        path: "patient",
        populate: { path: "user", select: "name email" }
      })
      .sort({ createdAt: -1 })
      .skip(skip) // Skip previous pages
      .limit(limit); // Limit results per page

    // 3. (Optional) Get total count for frontend "Load More" buttons
    const total = await Appointment.countDocuments();

    res.status(200).json({
      success: true,
      count: appointments.length,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit)
      },
      data: appointments
    });

  } catch (error) {
    console.error("Error fetching appointments:", error);
    res.status(500).json({
      success: false,
      message: "Error retrieving appointments"
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