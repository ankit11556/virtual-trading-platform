const jwt = require('jsonwebtoken');

const generateToken = (userid)=>{
try {
  const token = jwt.sign(
    {userid},
    process.env.TOKEN_KEY,
    {expiresIn: '7d'}
  )

  return token
} catch (error) {
  console.error("Error generating token:",error);
    throw new Error("Token generated failed")
}
}

module.exports = generateToken