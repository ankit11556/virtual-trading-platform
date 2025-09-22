const express = require('express');
const app = express();
const dotenv = require('dotenv')

dotenv.config()

app.use("/",(req,res,next)=>{
  res.send("Api is running...")
})

app.use((err,req,res,next)=>{
  console.error(err.stack);
  res.status(500).send('Something broke!')
})


const PORT = process.env.PORT
app.listen(PORT,()=>{
console.log(`server is running at http://localhost:${PORT}`);
})