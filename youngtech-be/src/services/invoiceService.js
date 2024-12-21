
const invoiceRepository = require("../repositories/invoiceRepository");

const invoiceService = {
  getAllInvoice: async () => {
    return await invoiceRepository.getAllInvoice();
  },

  getInvoiceById: async (id) => {
    return await invoiceRepository.getInvoiceById(id);
  },

  createInvoice: async (data) => {
    return await invoiceRepository.createInvoice(data);
  },

  deleteInvoice: async (id) => {
    return await invoiceRepository.deleteInvoice(id);
  },

  updateInvoice: async (id, data) => {
    return await invoiceRepository.updateInvoice(id, data);
  }
};

module.exports = invoiceService;
