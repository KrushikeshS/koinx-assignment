import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import statsRoutes from "./routes/stats.js";
import deviationRoutes from "./routes/deviation.js";
import {storeCryptoStats} from "./services/cryptoService.js";
import {startNatsListener} from "./nats/subscriber.js";

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

// Manual trigger endpoint (useful for testing/debugging)
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

// Connect to MongoDB and start server
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");

    // Start HTTP server
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

    // Start NATS listener
    startNatsListener().catch((err) => {
      console.error("Failed to start NATS listener:", err);
    });
  })
  .catch((err) => console.error("MongoDB connection error:", err));

// Error Handling
process.on("unhandledRejection", (err) => {
  console.error("Unhandled Promise Rejection:", err);
});

process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
  // In production, you might want to gracefully shutdown
  // process.exit(1);
});
