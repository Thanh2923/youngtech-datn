const express = require('express');
const rolesControllers = require('../controllers/rolesControllers');
const middlewareController = require('../controllers/middlewareController');
const roles = express.Router();

roles.post(
  '/createRole',
  // middlewareController.verifyToken,
  rolesControllers.createRole
);
roles.get(
 
  '/getAllRole',
  // middlewareController.verifyToken, 
  rolesControllers.getAllRole
);

module.exports = roles;
