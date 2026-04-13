const express = require("express");
const {
  addPatient,
  getPatients,
  updatePatient,
  deletePatient
} = require("../controllers/patientController");

const { protect } = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const router = express.Router();

// Add patient → Admin & Reception
router.post(
  "/",
  protect,
  authorizeRoles("admin", "reception"),
  addPatient
);

// Get patients → All roles
router.get("/", protect, getPatients);

// Update patient → Admin & Reception
router.put(
  "/:id",
  protect,
  authorizeRoles("admin", "reception"),
  updatePatient
);

// Delete patient → Admin only
router.delete(
  "/:id",
  protect,
  authorizeRoles("admin"),
  deletePatient
);

module.exports = router;