const express = require("express");
const {
  createBed,
  getBeds,
  assignBed,
  freeBed,
} = require("../controllers/bedController");

const { protect } = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const router = express.Router();

router.post("/", protect, authorizeRoles("admin"), createBed);

router.get("/", protect, getBeds);

router.put(
  "/:id/assign",
  protect,
  authorizeRoles("admin", "reception"),
  assignBed
);

router.put(
  "/:id/free",
  protect,
  authorizeRoles("admin", "reception"),
  freeBed
);

module.exports = router;