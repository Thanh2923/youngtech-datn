
const sequelize = require('../configs/db');

const invoiceRepository = {
  getAllInvoice: async () => {
    const query = `SELECT * FROM inputInvoice`;
    const [result] = await sequelize.query(query);
    return result;
  },
  getInvoiceById: async (id) => {
    const query = `SELECT * FROM inputInvoice WHERE id = :id `;
    const [result] = await sequelize.query(query, { replacements: { id } });
    return result[0];
  },

  createInvoice: async (data) => {
    const query = `INSERT INTO inputInvoice (invoiceDate , totalAmount , status , supplier_id , employee_id )
         VALUES (:invoiceDate, :totalAmount , :status ,:supplier_id , :employee_id)`;
    const [result] = await sequelize.query(query, { replacements: data });
    return result;
  },

  deleteInvoice: async (id) => {
    const query = `DELETE FROM inputInvoice WHERE id = :id`;
    const [result] = await sequelize.query(query, { replacements: { id } });
    return result;
  },

  updateInvoice: async (id, data) => {
    const query = `UPDATE inputInvoice SET invoiceDate =:invoiceDate , totalAmount = :totalAmount ,
     status=:status , supplier_id =:supplier_id , employee_id = :employee_id WHERE id =:id`;
    const [result] = await sequelize.query(query, {
      replacements: { ...data, id },
    });
    return result;
  },
};
module.exports = invoiceRepository;
