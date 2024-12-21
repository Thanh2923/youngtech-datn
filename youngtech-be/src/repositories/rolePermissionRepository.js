const sequelize = require('../configs/db');
const RolePermissionRepository = {
 

  // checkModuleExist(moduleName)
  checkModuleExist: async (moduleName) => {
    try {
      const query = `SELECT * FROM rolepermission WHERE module = :module`;
      const [result] = await sequelize.query(query, {
        replacements: { module: moduleName },
      });
      return result[0];
    } catch (error) {
      console.error(error);
      throw Error(error.message);
    }
  },

  checkPermission: async (roleId, moduleName, permissionId) => {
    try {
      const query = `SELECT * FROM rolepermission WHERE role_id = :role_id AND permission_id = :permission_id AND module = :module`;
      const [result] = await sequelize.query(query, {
        replacements: {
          role_id: roleId,
          permission_id: permissionId,
          module: moduleName,
        },
      });
      return result[0];
    } catch (err) {
      console.error(err);
      throw Error(err.message);
    }
  },
};

module.exports = RolePermissionRepository;
