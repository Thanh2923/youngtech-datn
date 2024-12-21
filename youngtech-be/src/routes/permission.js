const express = require('express');
const Permission = express.Router();
const PermissionController = require('../controllers/permissionController');

Permission.post('/createPermission',  PermissionController.createPermission);
Permission.post('/addPermissionToRole' , PermissionController.addPermissionToRole);

module.exports = Permission;
