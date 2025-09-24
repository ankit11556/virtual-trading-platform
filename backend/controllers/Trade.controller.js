const axios = require('axios');
const User = require('../models/User.model');
const Trade = require('../models/Trade.model');

exports.createtrade = async (req,res) => {
  try {
    const {symbol, type, quantity} = req.body;
    const userId = req.user._id;

    const response = await axios.get(`https://api.binance.com/api/v3/ticker/price?symbol=${symbol}`);
    const price = parseFloat(response.data.price);

    const total = price * quantity;

    const user = await User.findById(userId);

    if (type === "buy" && total > user.balance) {
      return res.status(400).json({message: "Insufficient balance"})
    }

    if (type === "buy") {
      user.balance -= total
    } else if (type === "sell") {
      user.balance += total
    }

    await user.save();

    const trade = await Trade.create({userId,symbol,type,quantity,price});

    res.status(201).json({message: "Trade executed successfully",trade,balance: user.balance})
  } catch (error) {
   res.status(500).json({ message: err.message }); 
  }
}