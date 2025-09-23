const User = require('../models/User.model')

//user register
exports.register = async (req,res) => {
  try {
    const {name, email, password} = req.body;
    const existUser = await User.findOne({email})
    if (existUser) {
      return res.status(400).json({message: "User aleardy exists"})
    }

    const user = await User.create({name, email, password});
   
    res.status(201).json({message: "Registration successful",
       user: {
      id: user._id,
      name: user.name,
      email: user.email,
      balence: user.balance
    }
    })

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}