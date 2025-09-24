const express = require('express');
const router = express.Router();
const {createtrade} = require('../controllers/Trade.controller')
const {protectRoutes} = require('../middleware/Auth.middleware');

router.post("/",protectRoutes,createtrade)

module.exports = router