const mongoose = require("mongoose");

const bedSchema = new mongoose.Schema(
  {
    bedNumber: {
      type: String,
      required: true,
      unique: true,
    },
    type: {
      type: String,
      enum: ["ICU", "General", "Private"],
      required: true,
    },
    status: {
      type: String,
      enum: ["Available", "Occupied"],
      default: "Available",
    },
    assignedPatient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Bed", bedSchema);