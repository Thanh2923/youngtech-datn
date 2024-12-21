// outinvoiceService.js
const outInvoiceRepository = require('../repositories/outinvoiceRepository');

const outInvoiceService = {
    getAllOutInvoices: async ({ offset, limit }) => {
        return await outInvoiceRepository.getAllOutInvoices({ offset, limit });
    },

    getOutInvoiceById: async (id) => {
        return await outInvoiceRepository.getOutInvoiceById(id);
    },

    createOutInvoice: async (invoiceData) => {
        return await outInvoiceRepository.createOutInvoice(invoiceData);
    },

    deleteOutInvoice: async (id) => {
        return await outInvoiceRepository.deleteOutInvoice(id);
    }
};

module.exports = outInvoiceService;
