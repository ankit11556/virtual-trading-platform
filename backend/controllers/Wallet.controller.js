const User = require('../models/User.model')
exports.getWallet = async (req,res) => {
  try {
    const id = req.user._id;
    const user = await User.findById(id).select("name email balance");
    
    res.json({balance: user.balance})
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
}