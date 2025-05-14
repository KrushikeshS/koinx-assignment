import axios from "axios";
import CryptoStat from "../models/CryptoStat.js"; // ✅ USE THIS MODEL

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
      // ✅ INSERT a new stat instead of updating
      await CryptoStat.create({
        id: coin.id,
        symbol: coin.symbol,
        name: coin.name,
        image: coin.image,
        current_price: coin.current_price,
        market_cap: coin.market_cap,
        price_change_percentage_24h: coin.price_change_percentage_24h,
      });
    }

    console.log(
      "storeCryptoStats: Crypto stats saved in CryptoStat collection."
    );
  } catch (err) {
    console.error("storeCryptoStats error:", err.message);
  }
}
