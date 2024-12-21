const sequelize = require('../configs/db');

const roleRepository = {
  createRole: async (roleName) => {
    const query = `INSERT INTO role (roleName) 
         VALUES ( :roleName) `;
    const [result] = await sequelize.query(query, {
      replacements: { roleName },
    });
    return result;
  },
  getAllRole: async () => {
    const query = `SELECT * FROM role`;
    const [result] = await sequelize.query(query);
    return result;
  },
  // check role name exist 
  checkRole: async (roleName) => {
    const query = `SELECT * FROM role WHERE roleName =:roleName`;
    const [result] = await sequelize.query(query, {
      replacements: { roleName },
    });
    return result[0].id;
  },
};

module.exports = roleRepository;
