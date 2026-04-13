const Appointment = require("../models/Appointment");

// Create Appointment
exports.createAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.create(req.body);

    res.status(201).json({
      message: "Appointment Created",
      appointment,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Get Appointments
exports.getAppointments = async (req, res) => {
  try {
    let appointments;

    if (req.user.role === "doctor") {
      appointments = await Appointment.find({
        doctor: req.user._id,
      })
        .populate("patient", "name")
        .populate("doctor", "name");
    } else {
      appointments = await Appointment.find()
        .populate("patient", "name")
        .populate("doctor", "name");
    }

    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// 👇 ADD THIS HERE (NEW FUNCTION)

// Update Appointment Status
exports.updateAppointmentStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    // Doctor can update only his own appointment
    if (
      req.user.role === "doctor" &&
      appointment.doctor.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({ message: "Not authorized" });
    }

    appointment.status = status;
    await appointment.save();

    res.status(200).json({
      message: "Status Updated",
      appointment,
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};