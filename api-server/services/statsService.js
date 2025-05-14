// services/statsService.js
import CryptoStat from "../models/CryptoStat.js";

export async function getLatestCryptoStat(coinId) {
  return await CryptoStat.findOne({id: coinId}).sort({createdAt: -1});
}

export async function getPriceDeviation(coinId) {
  const records = await CryptoStat.find({id: coinId})
    .sort({createdAt: -1})
    .limit(100);

  if (!records.length) return null;

  const prices = records.map((entry) => entry.current_price);

  // Calculate mean
  const mean = prices.reduce((acc, p) => acc + p, 0) / prices.length;

  // Calculate variance with more precision for small numbers
  const variance =
    prices.reduce((acc, p) => {
      const diff = p - mean;
      return acc + diff * diff;
    }, 0) / prices.length;

  // Calculate standard deviation
  const stdDev = Math.sqrt(variance);

  // Log for debugging
  console.log({
    coin: coinId,
    recordCount: records.length,
    priceRange: {
      min: Math.min(...prices),
      max: Math.max(...prices),
    },
    calculations: {
      mean: mean,
      variance: variance,
      stdDev: stdDev,
    },
  });

  // Return with proper precision for small numbers
  return stdDev * 1000; // Multiply by 1000 to show in basis points
}
