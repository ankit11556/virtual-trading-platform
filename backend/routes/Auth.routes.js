const express = require('express')
const router = express.Router();
const {registerController,loginController,logout} = require("../controllers/Auth.controller")
const {protectRoutes} = require("../middleware/Auth.middleware")

router.post("/register",registerController)
router.post("/login",loginController)
router.post("/logout",logout)

router.get("/check-auth",protectRoutes,(req,res)=>{
  res.json({user: req.user})
})

module.exports = router