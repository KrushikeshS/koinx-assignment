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
  const mean = prices.reduce((acc, p) => acc + p, 0) / prices.length;
  const variance =
    prices.reduce((acc, p) => acc + (p - mean) ** 2, 0) / prices.length;
  const stdDev = Math.sqrt(variance);

  return stdDev;
}
