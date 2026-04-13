const Patient = require("../models/Patient");

// Add Patient
exports.addPatient = async (req, res) => {
  try {

    // console.log("Request Body:", req.body);

    const { name, age, gender, disease, assignedDoctor } = req.body;

    const patient = await Patient.create({
      name,
      age,
      gender,
      disease,
      assignedDoctor,
    });

    res.status(201).json({
      message: "Patient Added Successfully",
      patient,
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Get Patients
exports.getPatients = async (req, res) => {
  try {
    let patients;

    if (req.user.role === "doctor") {
      patients = await Patient.find({ assignedDoctor: req.user._id })
        .populate("assignedDoctor", "name email");
    } else {
      patients = await Patient.find()
        .populate("assignedDoctor", "name email");
    }

    res.status(200).json(patients);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Update Patient
exports.updatePatient = async (req, res) => {
  try {
    const updatedPatient = await Patient.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json({
      message: "Patient Updated Successfully",
      updatedPatient,
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Delete Patient
exports.deletePatient = async (req, res) => {
  try {
    await Patient.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Patient Deleted Successfully",
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};