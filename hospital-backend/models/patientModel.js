import mongoose from "mongoose";

const patientSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    // ✅ REMOVED unique: true here to fix the "500 duplicate key" error
    // unique: true 
  },

  age: {
    type: Number,
    required: [true, "Age is required"],
    min: [0, "Age cannot be negative"]
  },

  gender: {
    type: String,
    enum: ["male", "female", "other"],
    required: [true, "Gender is required"]
  },

  bloodGroup: {
    type: String,
    enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    required: [true, "Blood group is required"]
  },

  contact: {
    type: String,
    match: [/^[0-9]{11}$/, "Contact must be exactly 11 digits"]
  },

  address: String,

  assignedDoctors: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor"
    }
  ],

  disease: {
    type: String,
    required: [true, "Disease is required"]
  },

  history: [
    {
      disease: String,
      treatmentDate: Date,
      notes: String
    }
  ],

  medicines: [
    {
      medicine: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Medicine"
      },
      givenBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doctor"
      },
      dosage: String
    }
  ]
}, { timestamps: true });

const Patient = mongoose.model("Patient", patientSchema);
export default Patient;