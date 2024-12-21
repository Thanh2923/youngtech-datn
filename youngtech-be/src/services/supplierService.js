const supplierRepository = require("../repositories/supplierRepository");

const supplierService = {
  getAllSuppliers: async (offset, limit) => {
    return await supplierRepository.getAllSuppliers({ offset, limit });
  },

  getSupplierById: async (id) => {
    return await supplierRepository.getSupplierById(id);
  },

  createSupplier: async (supplierData) => {
    return await supplierRepository.createSupplier(supplierData);
  },

  updateSupplier: async (id, supplierData) => {
    return await supplierRepository.updateSupplier(id, supplierData);
  },

  deleteSupplier: async (id) => {
    return await supplierRepository.deleteSupplier(id);
  },

  restoreSupplier: async (id) => {
    return await supplierRepository.restoreSupplier(id);
  }

  
};

module.exports = supplierService;
