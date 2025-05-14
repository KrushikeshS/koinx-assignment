// services/cryptoService.js
import axios from "axios";
import Crypto from "../models/crypto.js";

export async function fetchAndSaveCryptoData() {
  try {
    const {data} = await axios.get(
      "https://api.coingecko.com/api/v3/coins/markets",
      {
        params: {
          vs_currency: "usd",
          order: "market_cap_desc",
          per_page: 10,
          page: 1,
          sparkline: false,
        },
      }
    );

    for (const coin of data) {
      await Crypto.findOneAndUpdate(
        {id: coin.id},
        {...coin},
        {upsert: true, new: true}
      );
    }

    console.log("Crypto data fetched and stored successfully.");
  } catch (err) {
    console.error("Error fetching crypto data:", err.message);
  }
}
