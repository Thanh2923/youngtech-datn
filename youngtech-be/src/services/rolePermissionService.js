const RolePermissionRepository = require('../repositories/rolePermissionRepository');

const RolePermissionService = { 
  //checkModuleExist(moduleName)
  checkModuleExist : async (moduleName) => {
    return await RolePermissionRepository.checkModuleExist(moduleName)
  },


  //checkPermission(roleId , moduleName , permissionId)
  checkPermission : async (roleId , moduleName , permissionId) => {
    return await RolePermissionRepository.checkPermission(roleId , moduleName , permissionId)
  }
};
module.exports = RolePermissionService;
