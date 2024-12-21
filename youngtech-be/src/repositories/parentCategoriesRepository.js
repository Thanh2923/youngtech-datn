const sequelize = require('../configs/db');

const parentCategoriesRepository = {
    getAllParentCategories: async () => {
        const query = `SELECT * FROM parentcategories WHERE flag = true`;
        const [result] = await sequelize.query(query);
        return result;
    },
    getIdByName: async (name) => {
      const query = `SELECT name FROM parentcategories WHERE id = :id AND flag = true`;
      const [result] = await sequelize.query(query, {
          replacements: { name },
          type: sequelize.QueryTypes.SELECT
      });
      return result.length > 0 ? result[0].id : null;
  },
    getParentCategoriesById: async (id) => {
        const query = `SELECT * FROM parentcategories WHERE id = :id`;
        const [result] = await sequelize.query(query, { replacements: { id } });
        return result[0];  // Trả về bản ghi nếu tìm thấy
    },

    createParentCategories: async (data) => {
        const { name, flag = true } = data; // Mặc định flag là true nếu không được truyền
        const query = `INSERT INTO parentcategories (name, flag)
                       VALUES (:name, :flag)`;
        const [result] = await sequelize.query(query, {
          replacements: { name, flag },
        });
        return result;
      },      

    

    deleteParentCategories: async (id) => {
        const query = `UPDATE parentcategories SET flag = false WHERE id = :id`; // Đánh dấu xóa mềm
        const [result] = await sequelize.query(query, { replacements: { id } });
        return result;
    },
    restoreParentCategories: async (id) => {
        const query = `UPDATE parentcategories SET flag = true WHERE id = :id`; // Khôi phục xóa mềm
        const [result] = await sequelize.query(query, { replacements: { id } });
        return result;
      },
      
    updateParentCategories: async (id, data) => {
    const { name } = data; // Lấy chỉ trường name từ data
    const query = `UPDATE parentcategories
                   SET name = :name
                   WHERE id = :id`;
    const [result] = await sequelize.query(query, { replacements: { name, id } });
    return result;
},

};

module.exports = parentCategoriesRepository;
