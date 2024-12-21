const parentCategoriesService = require("../services/parentCategoriesService");

const parentCategoriesController = {
  getAllParentCategories: async (req, res) => {
    try {
      const result = await parentCategoriesService.getAllParentCategories();
      res.json({ message: "All parent categories!", data: result });
    } catch (err) {
      res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
  },
  
  getParentCategoriesById: async (req, res) => {
    try {
      const id = req.params.id;
      const result = await parentCategoriesService.getParentCategoriesById(id);
      if (!result) {
        res.status(404).json({ message: "parent parent categories by id not found" });
      } else {
        res.status(200).json({ message: "Success", data: result });
      }
    } catch (err) {
      res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
  },
  
  updateParentCategories: async (req, res) => {
    try {
      const id = req.params.id;
      const data = req.body;
      const result = await parentCategoriesService.updateParentCategories(id, data);
      if (!result) {
        res.status(404).json({ message: "parent categories not found for update" });
      } else {
        res.status(200).json({ message: "Update successful", data: result });
      }
    } catch (err) {
      res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
  },
  
  
  createParentCategories: async (req, res) => {
    try {
      const { name } = req.body;
      if (!name) {
        return res.status(400).json({ message: "Name is required" });
      }
  
      const result = await parentCategoriesService.createParentCategories(name);
      if (!result) {
        res.status(400).json({ message: "Create parent categories failed!" });
      } else {
        res.status(201).json({ message: "Parent category created successfully!", data: result });
      }
    } catch (err) {
      res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
  },
  
  deleteParentCategories: async (req, res) => {
    try {
      const id = req.params.id;
      // Thay vì xóa hoàn toàn, bạn cập nhật trường flag thành true
      const result = await parentCategoriesService.deleteParentCategories(id, { flag: true });
      
      if (!result) {
        res.status(404).json({ message: "Parent category not found" });
      } else {
        res.status(200).json({ message: "Parent category soft deleted successfully!" });
      }
    } catch (err) {
      res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
  },
    
  restoreParentCategories: async (req, res) => {
    try {
      const id = req.params.id;

      // Gọi service để khôi phục lại
      const result = await parentCategoriesService.restoreParentCategories(id);

      if (!result) {
        res.status(404).json({ message: "Parent category not found or already restored" });
      } else {
        res.status(200).json({ message: "Parent category restored successfully!" });
      }
    } catch (err) {
      res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
  },
  
};

module.exports = parentCategoriesController;
