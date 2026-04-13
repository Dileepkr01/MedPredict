const Bed = require("../models/Bed");

// Add Bed (Admin)
exports.createBed = async (req, res) => {
  try {
    const bed = await Bed.create(req.body);
    res.status(201).json(bed);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get All Beds
exports.getBeds = async (req, res) => {
  try {
    const beds = await Bed.find().populate("assignedPatient", "name");
    res.status(200).json(beds);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Assign Bed to Patient (Reception/Admin)
exports.assignBed = async (req, res) => {
  try {
    const { patientId } = req.body;

    const bed = await Bed.findById(req.params.id);

    if (!bed) {
      return res.status(404).json({ message: "Bed not found" });
    }

    if (bed.status === "Occupied") {
      return res.status(400).json({ message: "Bed already occupied" });
    }

    bed.status = "Occupied";
    bed.assignedPatient = patientId;

    await bed.save();

    res.status(200).json({ message: "Bed Assigned", bed });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Discharge Patient (Free Bed)
exports.freeBed = async (req, res) => {
  try {
    const bed = await Bed.findById(req.params.id);

    if (!bed) {
      return res.status(404).json({ message: "Bed not found" });
    }

    bed.status = "Available";
    bed.assignedPatient = null;

    await bed.save();

    res.status(200).json({ message: "Bed Freed", bed });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};