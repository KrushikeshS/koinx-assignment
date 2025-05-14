import express from "express";
import {fetchAndSaveCryptoData} from "../services/cryptoService.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    await fetchAndSaveCryptoData();
    res.status(200).send("Crypto stats updated.");
  } catch (err) {
    res.status(500).send("Failed to fetch stats.");
  }
});

export default router;
