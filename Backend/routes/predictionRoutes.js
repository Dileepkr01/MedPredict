const express = require("express");
const { getMLPrediction } = require("../controllers/predictionController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/ml", protect, getMLPrediction);

module.exports = router;