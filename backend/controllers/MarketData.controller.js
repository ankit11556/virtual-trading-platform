const axios = require('axios');

exports.getMargetPrice = async (req,res) => {
  try {
    const {symbol} = req.query;
    const response = await axios.get(`https://api.binance.com/api/v3/ticker/price?symbol=${symbol}`)

    res.json({
      symbol: response.data.symbol,
      price: parseFloat(response.data.price),
      time: new Date().toISOString()
    })
  } catch (error) {
    res.status(500).json({ message: 'Error fetching market data', error: err.message });
  }
}