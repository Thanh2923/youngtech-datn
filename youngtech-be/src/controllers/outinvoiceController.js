const outInvoiceService = require('../services/outinvoiceService');

const outInvoiceController = {
  getAllOutInvoices: async (req, res) => {
    try {
      // Lấy page và limit từ query parameters
      const { page , limit  } = req.query;
      const offset = (page - 1) * limit;

      // Gọi service để lấy dữ liệu
      console.log(page , limit , offset)
      const result = await outInvoiceService.getAllOutInvoices({
        offset,
        limit,
      });


      // Gọi service để lấy dữ liệu
      if (!result.data || result.data.length === 0) {
        return res.status(404).json({ message: 'No invoices found!' });
      }

      // Tính toán số trang
      const totalPages = Math.ceil(result.totalItems / limit);

      // Trả về kết quả với dữ liệu và thông tin phân trang
      res.status(200).json({
        data: result.data,
        pagination: {
          currentPage: parseInt(page),
          totalPages,
          totalItems: result.totalItems,
          pageSize: parseInt(limit),
        },
      });
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving invoices', error });
    }
  },

  getOutInvoiceById: async (req, res) => {
    try {
      const { id } = req.params;
      const invoice = await outInvoiceService.getOutInvoiceById(id);
      if (!invoice) {
        return res.status(404).json({ message: 'Invoice not found' });
      }
      res.status(200).json(invoice);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving invoice', error });
    }
  },
  createOutInvoice: async (req, res) => {
    try {
      const newInvoice = await outInvoiceService.createOutInvoice(req.body);
      if (!newInvoice) {
        return res.status(400).json({ message: 'Error creating invoice' });
      }
      res.status(201).json(newInvoice);
    } catch (error) {
      res.status(500).json({ message: 'Error creating invoice', error });
    }
  },

  deleteOutInvoice: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await outinvoiceService.deleteOutInvoice(id);
      if (!result) {
        return res.status(404).json({ message: 'Invoice not found' });
      }
      res.status(200).json({ message: 'Invoice deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting invoice', error });
    }
  },
};

module.exports = outInvoiceController;
