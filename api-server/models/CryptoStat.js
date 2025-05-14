// models/CryptoStat.js
import mongoose from "mongoose";

const cryptoStatSchema = new mongoose.Schema({
  coin: {type: String, required: true},
  price: {type: Number, required: true},
  marketCap: {type: Number, required: true},
  change24h: {type: Number, required: true},
  fetchedAt: {type: Date, default: Date.now},
});

const CryptoStat = mongoose.model("CryptoStat", cryptoStatSchema);
export default CryptoStat;
