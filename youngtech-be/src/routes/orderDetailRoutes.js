const express = require('express');
const orderDetailRoutes = express.Router();
const orderDetailController = require('../controllers/orderDetailController');

orderDetailRoutes.get('/', orderDetailController.getAllOrderDetail);
orderDetailRoutes.get('/:id', orderDetailController.getOrderDetailById);
orderDetailRoutes.post('/', orderDetailController.createOrderDetail);
orderDetailRoutes.put('/:id', orderDetailController.updateOrderDetail);
orderDetailRoutes.delete('/:id', orderDetailController.deleteOrderDetail);
module.exports = orderDetailRoutes;