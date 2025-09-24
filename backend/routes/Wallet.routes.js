const express = require('express');
const router = express.Router();
const {protectRoutes} = require('../middleware/Auth.middleware')
const {getWallet} = require('../controllers/Wallet.controller')

router.get("/",protectRoutes,getWallet)


module.exports = router
