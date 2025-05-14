// models/cryptoStat.js
import mongoose from "mongoose";

const cryptoStatSchema = new mongoose.Schema(
  {
    id: {type: String, required: true},
    symbol: String,
    name: String,
    image: String,
    current_price: Number,
    market_cap: Number,
    price_change_percentage_24h: Number,
  },
  {timestamps: true}
);

const CryptoStat = mongoose.model("CryptoStat", cryptoStatSchema);
export default CryptoStat;
