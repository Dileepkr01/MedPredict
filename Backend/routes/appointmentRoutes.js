const express = require("express");
const {
  createAppointment,
  getAppointments,
  updateAppointmentStatus,
} = require("../controllers/appointmentController");

const { protect } = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const router = express.Router();

// Create appointment
router.post(
  "/",
  protect,
  authorizeRoles("admin", "reception"),
  createAppointment
);

// Get appointments
router.get("/", protect, getAppointments);

// Update appointment status
router.put(
  "/:id/status",
  protect,
  authorizeRoles("admin", "doctor"),
  updateAppointmentStatus
);

module.exports = router;