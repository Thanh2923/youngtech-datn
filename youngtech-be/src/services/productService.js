const productRepository = require('../repositories/productRepository');

const productService = {
    getAllProduct: async ({ offset, limit })=>{
        return await productRepository.getAllProduct({ offset, limit });
    },
    viewListProduct: async ({ offset, limit })=>{
        return await productRepository.viewListProduct({ offset, limit });
    },
    
    getProductById: async (id) => {
        return await productRepository.getProductById(id);
    },

    updatePricesProduct: async (id, data) => {
        return await productRepository.updatePricesProduct(id, data);
      },

    // Thêm hàm mới để lấy sản phẩm theo childCategory_id
    getProductByChildCategory: async (childCategoryId,limit, offset) => {
        return await productRepository.getProductByChildCategory(childCategoryId,limit, offset);
    },

    getProductByParentCategory: async (parentCategoryId,limit,offset) => {
        return await productRepository.getProductByParentCategory(parentCategoryId,limit,offset)
       
      },
    createProduct: async (data) => {
        return await productRepository.createProduct(data);
    },

    deleteProduct: async (id) => {
        return await productRepository.deleteProduct(id); // Xóa mềm
    },
      
    restoreProduct: async (id) => {
        return await productRepository.restoreProduct(id);
    },
    updateProduct: async (id, data) => {
        return await productRepository.updateProduct(id, data);
      },

    editProduct: async (id, data) => {
        return await productRepository.editProduct(id, data);
      },
 };

 module.exports = productService;