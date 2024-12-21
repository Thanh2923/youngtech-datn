const sequelize = require("../configs/db");

const supplierRepository = {
  getAllSuppliers: async ({ offset, limit }) => {
    console.log('<< offset, limit >>', offset, limit);
    const query = `SELECT * FROM supplier WHERE flag = true LIMIT :limit OFFSET :offset`;
    const [results] = await sequelize.query(query, {
      replacements: { limit, offset }
    });

    // Lấy tổng số nhà cung cấp để tính tổng số trang
    const totalQuery = `SELECT COUNT(*) AS totalItems FROM supplier WHERE flag = 1`;
    const [totalResult] = await sequelize.query(totalQuery);
    const totalItems = totalResult[0].totalItems;
    console.log('<< totalItems >>', totalItems);

    return {
      data: results,
      totalItems
    };
  },

  getSupplierById: async (id) => {
    const query = `SELECT * FROM supplier WHERE id = :id AND flag = 1`;
    const [result] = await sequelize.query(query, { replacements: { id } });
    return result[0];
  },

  createSupplier: async (supplierData) => {
    const query = `INSERT INTO supplier (supplierName, contactName, phoneNumber, email, address) 
                   VALUES (:supplierName, :contactName, :phoneNumber, :email, :address)`;
    const [result] = await sequelize.query(query, {
      replacements: supplierData
    });
    return result;
  },

  updateSupplier: async (id, supplierData) => {
    const query = `UPDATE supplier SET supplierName = :supplierName, contactName = :contactName, 
                   phoneNumber = :phoneNumber, email = :email, address = :address 
                   WHERE id = :id AND flag = false`;
    const [result] = await sequelize.query(query, {
      replacements: { ...supplierData, id }
    });
    return result;
  },

  deleteSupplier: async (id) => {
    const query = `UPDATE supplier SET flag = false WHERE id = :id`;
    const [result] = await sequelize.query(query, { replacements: { id } });
    return result;
  },

  restoreSupplier: async (id) => {
    const query = `UPDATE supplier SET flag = false WHERE id = :id`;
    const [result] = await sequelize.query(query, { replacements: { id } });
    return result;
  }
};

module.exports = supplierRepository;
