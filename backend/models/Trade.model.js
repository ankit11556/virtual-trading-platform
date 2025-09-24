const mongoose = require('mongoose');

const tradeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  symbol: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ["buy","sell"],
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  profitLoss: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Trade = mongoose.model("Trade",tradeSchema);

module.exports = Trade