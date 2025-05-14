import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import statsRoutes from "./routes/stats.js";
import deviationRoutes from "./routes/deviation.js";
import {storeCryptoStats} from "./services/cryptoService.js";

dotenv.config();
const app = express();
app.use(express.json());

// Routes
app.use("/stats", statsRoutes);
app.use("/deviation", deviationRoutes);

// Health check endpoint
app.get("/", (req, res) => {
  res.json({
    status: "healthy",
    message: "Crypto API is running",
  });
});

// Manual trigger endpoint (can be useful for testing/debugging in production)
app.post("/trigger-collection", async (req, res) => {
  try {
    await storeCryptoStats();
    res.json({
      success: true,
      message: "Stats collection triggered successfully",
    });
  } catch (error) {
    console.error("Stats collection error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to collect stats",
      message: error.message,
    });
  }
});

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`API Server running on port ${PORT}`);
      console.log(`Health check: http://localhost:${PORT}/`);
      console.log(
        `Stats endpoint: http://localhost:${PORT}/stats?coin=bitcoin`
      );
      console.log(
        `Deviation endpoint: http://localhost:${PORT}/deviation?coin=bitcoin`
      );
    });
  })
  .catch((err) => console.error("MongoDB connection error:", err));

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.error("Unhandled Promise Rejection:", err);
  // Don't exit the process in production, just log the error
});
