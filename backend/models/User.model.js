const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    require: true
  },
  balance: {
    type: Number,
    default: 10000
  },
  role: {
    type: String,
    enum: ["user","admin"],
    default: "user"
  }
},{timestamps:true})

userSchema.pre('save', async function (next) {
  if (!this.isModified("password")) {
    return next()
  }
  try {
    this.password = await bcrypt.hash(this.password,10);
    next()
  } catch (error) {
    next(error)
  }
})

const User = mongoose.model("User",userSchema);
module.exports = User