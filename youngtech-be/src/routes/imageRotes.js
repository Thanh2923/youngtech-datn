const express = require('express');
const imageController = require('../controllers/imageController'); // Ensure this path is correct
const router = express.Router();

// Route để tạo ảnh mới cho sản phẩm
router.post('/create', imageController.create);

// Route để cập nhật ảnh cho sản phẩm (Thêm/xóa ảnh)
router.post('/update/:productId', imageController.updateImages);

// Route để lấy tất cả ảnh theo productId
router.get('/getAllByProductId/:productId', imageController.getAllByProductId);

// Route để lấy chi tiết một ảnh
router.get('/getDetailImage/:imageId', imageController.getDetailImage);

module.exports = router;
