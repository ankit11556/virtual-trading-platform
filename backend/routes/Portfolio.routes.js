const express = require('express');
const router = express.Router();
const {protectRoutes} = require('../middleware/Auth.middleware');
const {getPortfolio} = require('../controllers/Portfolio.controller');
const { route } = require('./Trade.routes');

router.get("/",protectRoutes,getPortfolio)

module.exports = router
