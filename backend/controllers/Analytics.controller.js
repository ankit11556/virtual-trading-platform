const Trade = require('../models/Trade.model')

exports.getAnalytics = async (req, res) => {
  try {
    const trades = await Trade.find({ userId: req.user._id });

    if (trades.length === 0) {
      return res.json({
        totalTrades: 0,
        winLossRatio: 0,
        avgProfitPerTrade: 0,
        totalProfitLoss: 0,
      });
    }

    let wins = 0;
    let losses = 0;
    let totalProfitLoss = 0;

    trades.forEach((t) => {
      totalProfitLoss += t.profitLoss;
      if (t.profitLoss > 0) wins++;
      else if (t.profitLoss < 0) losses++;
    });

    const winLossRatio = losses === 0 ? wins : (wins / losses).toFixed(2);
    const avgProfitPerTrade = (totalProfitLoss / trades.length).toFixed(2);

    res.json({
      totalTrades: trades.length,
      winLossRatio,
      avgProfitPerTrade,
      totalProfitLoss,
    });
  } catch (err) {
    res.status(500).json({ message: "Error fetching analytics", error: err.message });
  }
};
