const axios = require('axios');
const Trade = require('../models/Trade.model');

exports.getPortfolio = async (req,res) => {
  try {
    const trades = await Trade.find({userId: req.user._id});

    const holdings = {};
    trades.forEach((trade)=>{
      if (!holdings[trade.symbol]) {
        holdings[trade.symbol] = 0
      }
      if (trade.type === "buy") {
        holdings[trade.symbol] += trade.quantity;
      } else if (trade.type === "sell") {
        holdings[trade.symbol] -= trade.quantity;
      }
    });

    const portfolio = [];
    for (const symbol in holdings) {
      if (holdings[symbol] <= 0) continue; 

      const response = await axios.get( `https://api.binance.com/api/v3/ticker/price?symbol=${symbol}`);

      const currentPrice = parseFloat(response.data.price);
      const totalValue = holdings[symbol] * currentPrice;

      portfolio.push({
        symbol,
        quantity: holdings[symbol],
        currentPrice,
        totalValue,
      });
    }

    res.json({
      portfolio,
      totalPortfolioValue: portfolio.reduce((sum, p) => sum + p.totalValue, 0),
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching portfolio", error: err.message });
  }
}