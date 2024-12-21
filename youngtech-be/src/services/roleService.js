const roleRepository = require("../repositories/roleRepository");

const roleService = {
  createRole: async (roleName) => {
    return await roleRepository.createRole(roleName);
  },

  // check role name exists 
  checkRole: async (roleName) => {
    return await roleRepository.checkRole(roleName);
  },

  // get all role
  getAllRole: async () => {
    return await roleRepository.getAllRole();
  }
};

module.exports = roleService;
