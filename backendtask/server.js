const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");

dotenv.config();
connectDB();

const app = express();

// ✅ CORRECT CORS CONFIG
app.use(cors({
  origin: true, // ✅ BOOLEAN (NOT STRING)
  credentials: true
}));

app.use(express.json());

// routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/courses", require("./routes/courseRoutes"));
app.use("/api/recommendations", require("./routes/recommendationRoutes"));

app.listen(5000, () => console.log("Server running on port 5000"));