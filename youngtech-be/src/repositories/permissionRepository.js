const sequelize = require('../configs/db');

const PermissionRepository = {
  addPermission: async (action) => {
    try {
      const query = `INSERT INTO permission (action) VALUES (:action) `;
      const [result] = await sequelize.query(query, {
        replacements: { action: action },
      });
      return result;
    } catch (error) {
      console.error(error);
      throw Error(error.message);
    }
  },

  // checkPermission(permission.action)
  checkPermission: async (action) => {
    const query = `SELECT * FROM permission WHERE action =:action`;
    const [result] = await sequelize.query(query, {
      replacements: { action: action },
    });
    return result[0];
  },

  //   createPermission(roleId , permissionId)
  createPermission: async (roleId, permissionId, module) => {
    // permission = [1,2,3,4]
    const results = [];
    for (const permission of permissionId) {
      const query = `INSERT INTO rolepermission (role_id , permission_id , module) VALUES (:role_id , :permission_id , :module)`;
      const [result] = await sequelize.query(query, {
        replacements: {
          role_id: roleId,
          permission_id: permission,
          module: module,
        },
      });
      results.push(result);
    }
    return results;
  },

  getRoleId: async (roleName) => {
    const query = `SELECT * FROM role WHERE roleName = :roleName`;
    const [result] = await sequelize.query(query, {
      replacements: { roleName: roleName },
    });
    return result[0].id;
  },

  // getPermissionId(permissionName)
  getPermissionId: async (permissionName) => {
    const query = `SELECT * FROM permission WHERE action = :action`;
    const [result] = await sequelize.query(query, {
      replacements: { action: permissionName },
    });
    return result[0].id;
  },
};

module.exports = PermissionRepository;
