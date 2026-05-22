import User from "../models/userModel.js";
import { sendToken } from "../utils/jwtToken.js";
import { sendEmail } from "../utils/sendEmail.js";
import crypto from "crypto";

// ⬇️ ADD THESE TWO LINES HERE AT THE TOP ⬇️
import Doctor from "../models/doctorModel.js";
import Patient from "../models/patientModel.js";

/* =========================
   REGISTER USER
========================= */

/* REGISTER */
export const registerUserController = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists"
      });
    }

    const user = await User.create({
      name,
      email,
      password,
      role: "user",
      avatar: {
        public_id: "default",
        url: "default-url"
      }
    });

    sendToken(user, 201, res);

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/* LOGIN */
export const loginUserController = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials"
      });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials"
      });
    }

    sendToken(user, 200, res);

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/* LOGOUT */
export const logoutUser = async (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true
  });

  res.status(200).json({
    success: true,
    message: "Logged out"
  });
};
/* =========================
   GET PROFILE
========================= */
export const userProfileController = async (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user
  });
};

/* =========================
   GET USER BY ID (ADMIN)
========================= */
export const getUserByIdController = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    res.status(200).json({
      success: true,
      user
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/* =========================
   UPDATE PROFILE
========================= */
export const updateProfileController = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      req.body,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      user
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/* =========================
   DELETE PROFILE
========================= */
export const deleteProfileController = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.user._id);

    res.status(200).json({
      success: true,
      message: "User deleted successfully"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/* =========================
   DELETE USER BY ADMIN
========================= */
export const deleteProfileByIdController = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "User deleted successfully"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/* =========================
   GET ALL USERS (ADMIN)
========================= */
export const getAllUsersController = async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json({
      success: true,
      users,
      totalCount: users.length
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/* =========================
   FORGOT PASSWORD
========================= */
export const resetPasswordRequestController = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }
     

    const resetToken = user.getResetPasswordToken();
    await user.save({ validateBeforeSave: false });

    const resetUrl = `http://localhost:5173/reset-password/${resetToken}`;

    const message = `Reset your password using this link: ${resetUrl}`;

    await sendEmail({
      email: user.email,
      subject: "Password Reset",
      message
    });

    res.status(200).json({
      success: true,
      message: "Email sent successfully",
      resetToken

    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/* =========================
   RESET PASSWORD
========================= */
export const resetPasswordController = async (req, res) => {
  try {
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Token invalid or expired"
      });
    }

    const { password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match"
      });
    }

    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    sendToken(user, 200, res);

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/* =========================
   UPDATE PASSWORD
========================= */
export const updatePasswordController = async (req, res) => {
  try {
    const { oldPassword, newPassword, confirmNewPassword } = req.body;

    const user = await User.findById(req.user.id).select("+password");

    const isMatch = await user.comparePassword(oldPassword);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Old password is incorrect"
      });
    }

    if (newPassword !== confirmNewPassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match"
      });
    }

    user.password = newPassword;
    await user.save();

    sendToken(user, 200, res);

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/* =========================
   ADMIN CREATE DOCTOR ACCOUNT
========================= */


export const adminCreateDoctor = async (req, res) => {
  try {
    const { name, email, password, specialization, contact, fees, timing, days } = req.body;

    // 1. Check if user already exists
    let existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "User with this email already exists" });
    }

    // 2. Create the User with role "doctor"
    const newUser = await User.create({
      name,
      email,
      password,
      role: "doctor",
    });

    // 3. Create the Doctor profile linked to the new User
    const doctor = await Doctor.create({
      user: newUser._id,
      specialization,
      contact,
      fees,
      timing,
      days
    });

    res.status(201).json({
      success: true,
      message: "Doctor created successfully",
      doctor
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* =========================
   ADMIN CREATE PATIENT ACCOUNT (SIMPLIFIED)
========================= */
export const adminCreatePatient = async (req, res) => {
  try {
    // 1. Only take Account details from Admin
    const { name, email, password } = req.body;

    // 2. Check if User exists
    let existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ 
        success: false, 
        message: "User with this email already exists" 
      });
    }

    // 3. Create the User ONLY (No Patient Profile yet)
    const newUser = await User.create({
      name,
      email,
      password,
      role: "user", // This role indicates they are a patient
    });

    // ✅ SUCCESS: We do NOT create Patient here.
    // We just return the new user ID.
    
    res.status(201).json({
      success: true,
      message: "Patient account created successfully. User must login to complete profile.",
      user: newUser
    });

  } catch (error) {
    console.log("Admin Create Patient Error:", error);
    res.status(500).json({ 
      success: false, 
      message: error.message || "Server Error" 
    });
  }
};

/* =========================
   ADMIN UPDATE USER ROLE
========================= */
export const adminUpdateRole = async (req, res) => {
  try {
    const { role } = req.body;
    
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role },
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // 🔥 MAGIC FIX: If role is changed to 'doctor', create a placeholder Doctor profile
    if (role === 'doctor') {
      const existingDoctor = await Doctor.findOne({ user: user._id });
      
      // If they don't have a doctor profile yet, create one with default values
      if (!existingDoctor) {
        await Doctor.create({
          user: user._id,
          specialization: "Not Assigned", // Admin can edit this later
          contact: "N/A",
          fees: 0,
          days: [],
          timing: "N/A",
          isApproved: false // They still need to be approved!
        });
      }
    }

    res.status(200).json({ 
      success: true, 
      message: "Role updated successfully", 
      user 
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


// GET REAL BILLING DATA
export const getBillingReport = async (req, res) => {
  try {
    // Find completed appointments
    const completedAppointments = await Appointment.find({ status: 'Completed' })
      .populate('doctor')
      .populate('patient')
      .sort({ date: -1 });

    // Generate Invoices
    const invoices = completedAppointments.map((apt, index) => {
      const invoiceId = `INV-${String(index + 1).padStart(3, '0')}`;
      
      return {
        id: invoiceId,
        appointmentId: apt._id,
        patientName: apt.patient?.user?.name || "Unknown Patient",
        doctorName: apt.doctor?.user?.name || "Unknown Doctor",
        amount: apt.doctor?.fees || 0,
        date: apt.date,
        status: "Paid" // Assuming completed = paid
      };
    });

    res.status(200).json({
      success: true,
      invoices
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};