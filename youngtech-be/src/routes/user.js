const express = require('express');
const user = express.Router();
const userController = require('../controllers/userController');
const middlewareController = require('../controllers/middlewareController');

user.get(
  '/viewPersonalUser',
  middlewareController.verifyToken,
  userController.profile
);
user.patch(
  '/enterInfoPersonalUser',
  middlewareController.verifyToken,
  userController.createInformationPersonal
);

user.put(
  '/changePassword',
  middlewareController.verifyToken,
  userController.changePassword
);
module.exports = user;
