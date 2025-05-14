import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import statsRoutes from "./routes/stats.js";
// import {startNatsListener} from "./nats/subscriber.js";

dotenv.config();
const app = express();
app.use(express.json());

app.use("/stats", statsRoutes);

app.get("/", (req, res) => {
  res.send("Crypto API is running...");
});

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log(`API Server running on port ${PORT}`));
    // startNatsListener(); // Will subscribe to worker event (added later)
  })
  .catch((err) => console.error("MongoDB connection error:", err));
