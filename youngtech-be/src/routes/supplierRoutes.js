const express = require("express");
const supplierController = require("../controllers/supplierController");
const supplierRoutes = express.Router();

supplierRoutes.get("/", supplierController.getAllSuppliers);
supplierRoutes.post("/", supplierController.createSupplier);
supplierRoutes.put("/:id", supplierController.updateSupplier);
supplierRoutes.delete("/:id", supplierController.deleteSupplier);
supplierRoutes.get("/:id", supplierController.getSupplierById);

module.exports = supplierRoutes;
