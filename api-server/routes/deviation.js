import express from "express";
import {getPriceDeviation} from "../services/statsService.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const {coin} = req.query;

  if (!coin || !["bitcoin", "ethereum", "matic-network"].includes(coin)) {
    return res.status(400).json({error: "Invalid or missing 'coin' query param"});
  }

  try {
    const deviation = await getPriceDeviation(coin);
    
    if (deviation === null) {
      return res.status(404).json({error: "No stats found for this coin"});
    }

    // Return in exact format requested
    res.json({
      deviation: parseFloat(deviation.toFixed(2))
    });
  } catch (err) {
    console.error("Error calculating deviation:", err);
    res.status(500).json({error: "Internal server error"});
  }
});

export default router;
