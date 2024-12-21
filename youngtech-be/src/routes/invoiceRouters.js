


const express = require('express');
const invoiceRouters = express.Router();
const invoiceController = require('../controllers/invoiceController.js');

invoiceRouters.get('/' , invoiceController.getAllInvoice); 

invoiceRouters.get('/:id' , invoiceController.getInvoiceById);

invoiceRouters.post('/' , invoiceController.createInvoice);

invoiceRouters.put('/:id' , invoiceController.updateInvoice)

invoiceRouters.delete('/:id', invoiceController.deleteInvoice); 

module.exports = invoiceRouters;