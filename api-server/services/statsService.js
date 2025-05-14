// services/statsService.js
import Crypto from "../models/crypto.js";

export async function getLatestCryptoStat(coinId) {
  return await Crypto.findOne({id: coinId}).sort({createdAt: -1});
}
