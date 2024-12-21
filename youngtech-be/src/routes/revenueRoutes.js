const express = require('express');
const revenueController = require('../controllers/revenueControllers');
const revenueRoutes = express.Router();


revenueRoutes.get('/', revenueController.getRevenue);


module.exports = revenueRoutes;
