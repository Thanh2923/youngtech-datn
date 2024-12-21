const express = require('express');
const inputInvoiceController = require('../controllers/inputInvoicontroller'); // Import controller
const router = express.Router();

// Route để thêm hoặc cập nhật sản phẩm vào kho
router.post('/addProduct', inputInvoiceController.addProductToInventory);
router.post('/saveinputinvoice', inputInvoiceController.saveInputInvoice);
router.get('/getList', inputInvoiceController.getAllInputInvoice);



module.exports = router;
