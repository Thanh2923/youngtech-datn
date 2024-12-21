const express = require('express');
const {createPayment,createPaymentPayOs} = require("../controllers/paymentController")
const paymentRouter = express.Router();
paymentRouter.post('/createPayment' , createPayment)
paymentRouter.post('/createPaymentPayOs' ,createPaymentPayOs)

module.exports = paymentRouter;