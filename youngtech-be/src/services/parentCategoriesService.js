const parentCategoriesRepository = require("../repositories/parentCategoriesRepository");

const parentCategoriesService = {
  getAllParentCategories: async () => {
    return await parentCategoriesRepository.getAllParentCategories();
  },
  createParentCategories: async (name) => {
    return await parentCategoriesRepository.createParentCategories({ name });
  },  
  updateParentCategories: async (id, data) => {
    return await parentCategoriesRepository.updateParentCategories(id, data);
  },
  deleteParentCategories: async (id) => {
    const data = { flag: true };  // Dữ liệu xóa mềm
    return await parentCategoriesRepository.deleteParentCategories(id, data);
  },
  getParentCategoriesById: async (id) => {
    return await parentCategoriesRepository.getParentCategoriesById(id);
  },
  restoreParentCategories: async (id) => {
    // Gọi repository để thực hiện việc khôi phục
    return await parentCategoriesRepository.restoreParentCategories(id);
  },
};

module.exports = parentCategoriesService;
