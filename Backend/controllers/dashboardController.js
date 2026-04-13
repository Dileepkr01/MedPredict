const Patient = require("../models/Patient");
const User = require("../models/User");
const Appointment = require("../models/Appointment");

exports.getDashboardStats = async (req, res) => {
  try {
    const totalPatients = await Patient.countDocuments();
    const totalDoctors = await User.countDocuments({ role: "doctor" });
    const totalAppointments = await Appointment.countDocuments();
    const pendingAppointments = await Appointment.countDocuments({
      status: "Pending",
    });

    res.status(200).json({
      totalPatients,
      totalDoctors,
      totalAppointments,
      pendingAppointments,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};