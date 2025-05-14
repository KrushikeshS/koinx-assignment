// services/cryptoService.js
import axios from "axios";
import Crypto from "../models/crypto.js";

export async function storeCryptoStats() {
  try {
    const {data} = await axios.get(
      "https://api.coingecko.com/api/v3/coins/markets",
      {
        params: {
          ids: "bitcoin,ethereum,matic-network",
          vs_currency: "usd",
        },
      }
    );

    for (const coin of data) {
      await Crypto.findOneAndUpdate(
        {id: coin.id},
        {
          id: coin.id,
          symbol: coin.symbol,
          name: coin.name,
          image: coin.image,
          current_price: coin.current_price,
          market_cap: coin.market_cap,
          price_change_percentage_24h: coin.price_change_percentage_24h,
        },
        {upsert: true, new: true}
      );
    }

    console.log("storeCryptoStats: Crypto stats stored successfully.");
  } catch (err) {
    console.error("storeCryptoStats error:", err.message);
  }
}
