const express = require("express");
const router = express.Router();
const {protectRoutes} = require('../middleware/Auth.middleware');
const { getAnalytics } = require("../controllers/Analytics.controller");

router.get("/", protectRoutes, getAnalytics);

module.exports = router;
