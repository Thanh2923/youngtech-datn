const express = require('express');
const parentCategoriesRoutes = express.Router(); // Tên biến nhất quán là 'parentCategoriesRoutes'
const parentCategoriesController = require('../controllers/parentCategoriesvController'); // Import controller

// Define routes with valid callbacks
parentCategoriesRoutes.get('/', parentCategoriesController.getAllParentCategories);
parentCategoriesRoutes.post('/', parentCategoriesController.createParentCategories);
parentCategoriesRoutes.get('/:id', parentCategoriesController.getParentCategoriesById);
parentCategoriesRoutes.put('/:id', parentCategoriesController.updateParentCategories);
parentCategoriesRoutes.delete('/:id', parentCategoriesController.deleteParentCategories);
parentCategoriesRoutes.put('/:id/restore', parentCategoriesController.restoreParentCategories);
module.exports = parentCategoriesRoutes;
