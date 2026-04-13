const { exec } = require("child_process");
const path = require("path");

exports.getMLPrediction = (req, res) => {

  // Correct path to model.py
  const modelPath = path.join(__dirname, "../../ml/model.py");

  exec(`python "${modelPath}"`, (error, stdout, stderr) => {
    
    if (error) {
      return res.status(500).json({ error: error.message });
    }

    // Output from python
    const predictedPatients = parseInt(stdout);

    let message;

    if (predictedPatients > 80) {
      message = "High Patient Load Expected ⚠️";
    } else if (predictedPatients > 50) {
      message = "Moderate Load Expected 📊";
    } else {
      message = "Low Load Expected ✅";
    }

    res.json({
      predictedPatients,
      message,
    });

  });
};