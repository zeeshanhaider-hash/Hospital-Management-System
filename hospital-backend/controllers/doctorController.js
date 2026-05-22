import Doctor from "../models/doctorModel.js";

/* =========================
   CREATE DOCTOR (ADMIN)
========================= */
export const createDoctorController = async (req, res) => {
  try {
    const { specialization, contact, fees, days, timing } = req.body;

    const doctor = await Doctor.create({
      user: req.user._id,
      specialization,
      contact,
      fees,
      days,
      timing
    });


        

    res.status(201).json({
      success: true,
      doctor
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/* =========================
   GET ALL DOCTORS (PUBLIC)
========================= */
export const getDoctorsController = async (req, res) => {
  try {
    const doctors = await Doctor.find().populate("user", "name email role");

    res.status(200).json({
      success: true,
      doctors
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/* =========================
   GET SINGLE DOCTOR
========================= */
export const doctorDetailsController = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id).populate("user");

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found"
      });
    }

    res.status(200).json({
      success: true,
      doctor
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/* =========================
   UPDATE DOCTOR (ADMIN)
========================= */


// Ensure this controller handles updates including isApproved
export const updateDoctorController = async (req, res, next) => {
  try {
    const { specialization, contact, fees, timing, days, isApproved } = req.body;
    const doctorId = req.params.id;

    const doctor = await Doctor.findByIdAndUpdate(
      doctorId,
      { 
        specialization, 
        contact, 
        fees, 
        timing, 
        days,
        isApproved 
      },
      { new: true, runValidators: true }
    );

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found"
      });
    }

    res.status(200).json({
      success: true,
      doctor
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/* =========================
   DELETE DOCTOR (ADMIN)
========================= */
export const deleteDoctorController = async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndDelete(req.params.id);

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Doctor deleted successfully"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};