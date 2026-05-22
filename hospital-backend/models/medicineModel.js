// models/medicineModel.js
import mongoose from "mongoose";

const medicineSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: String,
  dosage: String,
  sideEffects: String,
  manufacturer: String,
  price: Number,
  stock: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

const Medicine = mongoose.model("Medicine", medicineSchema);
export default Medicine;