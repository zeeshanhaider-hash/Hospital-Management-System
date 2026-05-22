import Patient from "../models/patientModel.js";

/* =========================
   CREATE PATIENT PROFILE (Self Service)
   * Used when the User logs in and fills out their details
========================= */
export const createPatientController = async (req, res) => {
  try {
    // 1. Extract data from Frontend Form
    const { age, gender, bloodGroup, contact, address, disease } = req.body;

    // 2. Check if this USER already has a patient profile
    // We use req.user._id (the logged-in user)
    const existingPatient = await Patient.findOne({ user: req.user._id });

    if (existingPatient) {
      return res.status(400).json({
        success: false,
        message: "Patient profile already exists. Please update it instead."
      });
    }

    // 3. Create the profile linking to the logged-in user
    const patient = await Patient.create({
      user: req.user._id,  // ✅ Link to User
      age,
      gender,
      bloodGroup,
      contact,
      address,
      disease
    });

    res.status(201).json({
      success: true,
      message: "Patient profile created successfully",
      patient
    });

  } catch (error) {
    console.log("Patient Create Error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Server Error"
    });
  }
};

/* GET MY PATIENT */
export const getMyPatientProfile = async (req, res) => {
  try {
    const patient = await Patient.findOne({ user: req.user._id })
      .populate("user", "name email role")
      .populate("assignedDoctors");

    if (!patient) {
      return res.status(404).json({
        success: false,
        message: "Patient not found"
      });
    }

    res.status(200).json({
      success: true,
      patient
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
/* =========================
   UPDATE PATIENT
========================= */
export const updatePatientController = async (req, res) => {
  try {
    const patient = await Patient.findOneAndUpdate(
      { user: req.user._id },
      req.body,
      { new: true, runValidators: true }
    );

    if (!patient) {
      return res.status(404).json({
        success: false,
        message: "Patient not found"
      });
    }

    res.status(200).json({
      success: true,
      patient
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/* =========================
   DELETE PATIENT
========================= */
export const deletePatientController = async (req, res) => {
  try {
    const patient = await Patient.findOneAndDelete({ user: req.user._id });

    if (!patient) {
      return res.status(404).json({
        success: false,
        message: "Patient not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Patient deleted successfully"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};