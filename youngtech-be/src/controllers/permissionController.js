const { roleAccount } = require('../models/roleAccountModel');
const PermissionService = require('../services/permissionService');
const RoleService = require('../services/roleService');
const PermissionController = {
  createPermission: async (req, res) => {
    try {
      const permission = req.body;
      console.log(permission);
      if (permission.action === '' || null) {
        return res.status(400).json({ message: 'Permisison ivalid' });
      }
      const checkPermission = await PermissionService.checkPermission(
        permission.action
      );

      if (checkPermission) {
        return res.status(403).json({ message: 'Permission exist !' });
      }

      const addPermission = await PermissionService.addPermission(
        permission.action
      );
      if (!addPermission) {
        return res.status(403).json({ message: 'Permission not found !' });
      }
      res.status(201).json({ message: 'Permission seeded!' });
    } catch (err) {
      res.status(500).json(err.message);
    }
  },
  addPermissionToRole: async (req, res) => {
    //role_id vs permission_id,

    // default on database permission : CREATE , READ , UPDATE , DELETE

    // role Admin has all permission => CRUD [PersonInformation management, Employee management, Sales management, Business management , viewListOrder , viewProduct information , Supplier management , warehouse management ]

    // role Sales person has permission for Sales Management  => [READ , Create] .
    // role Sales person has permission for Person information Management  => [READ , Update ] .

    // role Business employee has permission for Person information Management  => [READ , Update ] .
    // role Business employee has permission for Business Management  => [ CREATE ,READ , Update ] .
    // role Business employee has permission for View Product information  => [READ] .
    // role Business employee has permission for Supplier management  => [only READ name product , price , description] .

    // role Storekeeper has permission for Person information Management  => [READ , Update] .
    // role Storekeeper has permission for InputInvoice Management => [READ] .

    // role Customer has permission for  Person information Management  => [READ , Update ]
    // role Customer has permission for View Product information => [READ ]
    // role Customer has permission for View Order Management  => [READ , Update , Delete , Create]
    // role Customer has permission for View Cart Management  => [READ , Update , Create = Add product  , Delete ]
    // create default

    //  const roleName = 'admin';
       const roleName = 'storekeeper';
    // const roleName = 'businessEmployee';
    // const roleName = 'salesperson';
    // const roleName = 'customer';
    //  const roleName = 'user'; 
    const getRoleId = await PermissionService.getRoleId(roleName);
    if (!getRoleId) {
      return res.status(404).json({ message: 'Role not found !' });
    }
    
    // [1-create , 2-read , 3-update , 4-delete]

    //  const permissionId = [1,2,3,4]; const module = 'all' // admin

      //  const permissionId = [2, 3]; const module = 'PersonInformation_Management' // storekeeper
       const permissionId = [2]; const module = 'ViewProduct_information' // storekeeper

    // const permissionId = [2, 3] ; const module ='PersonInformation_Management'  // businessEmployee
      //  const permissionId = [1,2, 3] ; const module ='Business_Management' // businessEmployee
    // const permissionId = [2] ; const module ='ViewProduct_information' // businessEmployee
    // const permissionId = [2] ; const module ='Supplier_Management' // businessEmployee

    // const permissionId = [1 , 2] ; const module ='Sales_Management' // salesperson
    // const permissionId = [2 , 3] ; const module ='PersonInformation_Management' // salesperson

      // const permissionId = [2, 3] ; const module ='PersonInformation_Management' // customer
    //  const permissionId = [2] ; const module ='ViewProduct_information' // customer
    // const permissionId = [1,2,3,4] ; const module ='Order_Management' // customer
    // const permissionId = [1,2,3,4] ; const module ='Cart_Management' // customer

    // const permissionId = [1, 2, 3];  const module = 'PersonInformation_Management' // user

    const addPermission = await PermissionService.createPermission(
      getRoleId,
      permissionId,
      module
    );


    if (!addPermission) {
      return res.status(403).json({ message: 'fail' });
    }

    res.status(201).json({ message: 'Permission seed' });
  },
};

module.exports = PermissionController;
