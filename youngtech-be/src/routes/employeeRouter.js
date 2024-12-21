const express = require('express');
const middlewareController = require('../controllers/middlewareController');
const employeeRouter = express.Router();
const employeeController = require('../controllers/employeeController');

employeeRouter.post(
  '/createEmployee',
  // middlewareController.verifyToken,
  // middlewareController.verifyTokenAndRole(['admin']),
  employeeController.createEmployee
);

employeeRouter.get(
  '/viewingListEmployee',
  // middlewareController.verifyToken,
  // middlewareController.verifyTokenAndRole(['admin']),
  employeeController.viewingListEmployee
);

employeeRouter.put(
  '/updateInformationEmployee/:employeeId',
  // middlewareController.verifyToken,
  // middlewareController.verifyTokenAndRole(['admin']),
  employeeController.updateInformationEmployee
);

employeeRouter.get(
  '/viewOnlyEmployee/:id',
  // middlewareController.verifyToken,
  // middlewareController.verifyTokenAndRole(['admin']),
  employeeController.viewOnlyEmployee
);

employeeRouter.delete(
  '/deleteEmployeeById/:id',
  // middlewareController.verifyToken,
  // middlewareController.verifyTokenAndRole(['admin']),
  employeeController.deleteEmployeeById
);

 
module.exports = employeeRouter;
