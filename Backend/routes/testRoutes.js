const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const router = express.Router();

router.get("/admin", protect, authorizeRoles("admin"), (req, res) => {
  res.json({ message: "Welcome Admin Dashboard" });
});

router.get("/doctor", protect, authorizeRoles("doctor"), (req, res) => {
  res.json({ message: "Welcome Doctor Dashboard" });
});

router.get("/reception", protect, authorizeRoles("reception"), (req, res) => {
  res.json({ message: "Welcome Reception Dashboard" });
});

module.exports = router;