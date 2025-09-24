const express = require('express');
const router = express.Router();
const {protectRoutes} = require('../middleware/Auth.middleware');
const {getMargetPrice} = require('../controllers/MarketData.controller');

router.get("/",protectRoutes,getMargetPrice)

module.exports = router