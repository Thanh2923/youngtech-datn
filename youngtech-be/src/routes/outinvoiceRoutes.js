const express = require('express');
const outInvoiceRoutes = express.Router();
const outInvoiceController = require('../controllers/outinvoiceController');
const middlewareController = require('../controllers/middlewareController');
const upload = require('../configs/cloudinary')
outInvoiceRoutes.get('/getAllOutInvoice',
    middlewareController.verifyToken,
    middlewareController.verifyTokenAndRole(['salesperson', 'admin']),
    outInvoiceController.getAllOutInvoices
);
outInvoiceRoutes.get('/:id', outInvoiceController.getOutInvoiceById);
outInvoiceRoutes.post('/',outInvoiceController.createOutInvoice);
outInvoiceRoutes.delete('/:id', outInvoiceController.deleteOutInvoice);
module.exports = outInvoiceRoutes;
