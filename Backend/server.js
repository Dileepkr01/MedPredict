const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/beds", require("./routes/bedRoutes"));

app.use("/api/dashboard", require("./routes/dashboardRoutes"));

app.use("/api/appointments", require("./routes/appointmentRoutes"));

app.use("/api/users", require("./routes/userRoutes"));

app.use("/api/patients", require("./routes/patientRoutes"));

app.use("/api/auth", require("./routes/authRoutes"));

app.use("/api/test", require("./routes/testRoutes"));

app.use("/api/predictions", require("./routes/predictionRoutes"));

app.get("/", (req, res) => {
  res.send("Hospital Resource Management API Running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));