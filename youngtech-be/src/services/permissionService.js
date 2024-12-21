const PermissionRepository = require('../repositories/permissionRepository');

const PermissionService = {
  addPermission: async (action) => {
    return await PermissionRepository.addPermission(action);
  },
  // checkPermission 
  checkPermission : async (action) => {
    return await PermissionRepository.checkPermission(action)
  },

  // 
 createPermission : async (roleId, permissionId , module) => {
    return await PermissionRepository.createPermission(roleId , permissionId, module)
 },

 // getRoleId(roleName) 

 getRoleId : async (roleName) => {
    return await PermissionRepository.getRoleId(roleName)
 },

 // getPermissionId(permissionName) 
 getPermissionId : async (permissionName) => {
  return await PermissionRepository.getPermissionId(permissionName)
 }
};

module.exports = PermissionService;
