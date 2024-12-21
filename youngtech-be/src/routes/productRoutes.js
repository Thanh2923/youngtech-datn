const express = require('express');
const productRoutes = express.Router();
const productController = require('../controllers/productController');

productRoutes.get('/', productController.getAllProduct);
productRoutes.get('/viewListProduct', productController.viewListProduct);
productRoutes.get('/validate', productController.validateProduct);

productRoutes.get('/:id', productController.getProductById);

productRoutes.post('/', productController.createProduct);

productRoutes.put('/editProduct/:id', productController.editProduct);

productRoutes.put('/:id', productController.updateProduct);

productRoutes.delete('/:id', productController.deleteProduct);

productRoutes.put('/:id/restore', productController.restoreProduct);

productRoutes.put('/updatePrices/:id', productController.updatePricesProduct);


productRoutes.get(
  '/childCategory/:childCategoryId',
  productController.getProductByChildCategory
);
productRoutes.get(
  '/parentCategory/:parentCategoryId',
  productController.getProductByParentCategory
);
module.exports = productRoutes;
