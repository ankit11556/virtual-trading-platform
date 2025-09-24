const express = require('express');
const router = express.Router();
const {createtrade,getTradeHistory} = require('../controllers/Trade.controller')
const {protectRoutes} = require('../middleware/Auth.middleware');

router.post("/",protectRoutes,createtrade)

router.get("/history",protectRoutes,getTradeHistory)

module.exports = router