
const invoiceService = require("../services/invoiceService");
const invoiceController = {
  getAllInvoice: async (req, res) => {
    try {
      const result = await invoiceService.getAllInvoice();
      res.json({ message: "All Invoice !" });
    } catch (err) {
      res.json({ message: "Err" });
    }
  },

  getInvoiceById: async (req, res) => {
    try {
      const id = req.params.id;
      const result = await invoiceService.getInvoiceById(id);
      if (!result) {
        res.json({ message: "Invoice by id not found !" });
      } else {
        res.json({ message: "Success!" });
      }
    } catch (err) {
      res.json({ message: "Err" });
    }
  },

  updateInvoice: async (req, res) => {
    try {
      const id = req.params.id;
      const data = req.body;
      const result = await invoiceService.updateInvoice(id, data);
      res.status(201).json({ message: result });
    } catch (err) {
      res.status(500).json({ message: "Err", err });
    }
  },

  createInvoice: async (req, res) => {
    try {
      const data = req.body;
      console.log(data);
      const result = await invoiceService.createInvoice(data);
      if (!result) {
        res.status(404).json({ message: "Create invoice fail !" });
      } else {
        res.status(201).json({ message: "Create invoice success !" });
      }
    } catch (err) {
      res.status(500).json({ data: err.message });
    }
  },

  deleteInvoice: async (req, res) => {
    try {
      const id = req.params.id;
      const result = await invoiceService.deleteInvoice(id);
      if (!result) {
        res.status(404).json({ message: "not found id invoice !" });
      } else {
        res.status(201).json({ message: "Delete success !" });
      }
    } catch (err) {
      res.json({ message: err.message });
    }
  }
  
};

module.exports = invoiceController;
