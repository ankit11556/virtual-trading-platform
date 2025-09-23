const User = require('../models/User.model');
const generateToken = require('../utils/GenerateToken.utils');
const setCookie = require('../utils/SetCookie.utils');

//user register controller
exports.registerController = async (req,res) => {
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

//login controller
exports.loginController = async (req,res) => {
  try {
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if (!user) {
      res.status(404).json({message: "User not found. Please register first."})
    }

    const isPasswordMatch = await user.isPasswordCompare(password);
    if (!isPasswordMatch) {
      return res.status(403).json({message: "Invalid credentials"})
    }
 
    const token = generateToken(user._id)
    setCookie(res,token)

     res.status(201).json({message: "Login successful",
       user: {
      id: user._id,
      name: user.name,
      email: user.email,
      balence: user.balance
    }
    })
  } catch (error) {
    res.status(500).json({message: 'login failed',error: error.message})
  }
}