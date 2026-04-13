const express = require("express");
const User = require("../models/User");
const { protect } = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const router = express.Router();

// Get all doctors
router.get(
    "/doctors",
    protect,
    authorizeRoles("admin", "reception"),   // ✅ FIXED
    async (req, res) => {
        try {
            const doctors = await User.find({ role: "doctor" }).select("name email");
            res.status(200).json(doctors);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
);

// Delete doctor
router.delete(
    "/doctors/:id",
    protect,
    authorizeRoles("admin"),
    async (req, res) => {
        try {
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json({ message: "Doctor Deleted" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
);

module.exports = router;