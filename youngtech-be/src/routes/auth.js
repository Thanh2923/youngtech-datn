const express = require('express');
const auth = express.Router();

const authControllers = require('../controllers/authControllers');
const middlewareController = require('../controllers/middlewareController');
auth.post('/register', authControllers.register);
auth.post('/login', authControllers.login);
auth.post('/refreshToken', authControllers.requestRefreshToken);
// LOG OUT
auth.post(
  '/logout',
  middlewareController.verifyToken,
  // authorization
  authControllers.userLogout
  // authentication
);

auth.post(
  '/generateOtp', 
  authControllers.generateOtp
);

auth.patch(
  '/resetPassword', 
  authControllers.resetPassword
); 
// sendingOTP
auth.post('/sendingOTP' , 
  authControllers.sendingOTP
)
module.exports = auth;
