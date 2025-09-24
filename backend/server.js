const express = require('express');
const app = express();
const dotenv = require('dotenv')
const connectDb = require('./config/Db.config')
const cookieParser = require('cookie-parser')
dotenv.config()

app.use(express.json())
app.use(cookieParser())

const authRoute = require('./routes/Auth.routes')
const walletRoute = require('./routes/Wallet.routes')
const marketDataRoute = require('./routes/MarketData.routes')

app.use("/api/auth",authRoute)
app.use("/api/wallet",walletRoute)
app.use("/api/market",marketDataRoute)

app.use("/",(req,res,next)=>{
  res.send("Api is running...")
})

app.use((err,req,res,next)=>{
  console.error(err.stack);
  res.status(500).send('Something broke!')
})


const PORT = process.env.PORT

connectDb().then(()=>{
app.listen(PORT,()=>{
console.log(`server is running at http://localhost:${PORT}`);
})
})