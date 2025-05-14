// routes/stats.js
import express from "express";
import {getLatestCryptoStat} from "../services/statsService.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const {coin} = req.query;

  if (!coin || !["bitcoin", "ethereum", "matic-network"].includes(coin)) {
    return res
      .status(400)
      .json({error: "Invalid or missing 'coin' query param"});
  }

  try {
    const stat = await getLatestCryptoStat(coin);

    if (!stat) {
      return res.status(404).json({error: "No stats found for this coin"});
    }

    res.json({
      price: stat.current_price,
      marketCap: stat.market_cap,
      "24hChange": stat.price_change_percentage_24h,
    });
  } catch (err) {
    console.error("Error fetching stat:", err);
    res.status(500).json({error: "Internal server error"});
  }
});

export default router;
