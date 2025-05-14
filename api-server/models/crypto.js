// models/crypto.js
import mongoose from "mongoose";

const cryptoSchema = new mongoose.Schema(
  {
    id: {type: String, required: true, unique: true},
    symbol: String,
    name: String,
    image: String,
    current_price: Number,
    market_cap: Number,
    market_cap_rank: Number,
    total_volume: Number,
    high_24h: Number,
    low_24h: Number,
    price_change_percentage_24h: Number,
  },
  {timestamps: true}
);

const Crypto = mongoose.model("Crypto", cryptoSchema);
export default Crypto;
