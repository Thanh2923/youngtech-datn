const sequelize = require('../configs/db');  

const inputInvoiceRepository = {
  getAllInputInvoice: async ({ offset, limit }) => {
    console.log('<< offset, limit >>', offset, limit);
    const query = `SELECT * FROM inputinvoice LIMIT :limit OFFSET :offset`;
    const [results] = await sequelize.query(query, {
      replacements: { limit, offset }
    });

    // Lấy tổng số nhà cung cấp để tính tổng số trang
    const totalQuery = `SELECT COUNT(*) AS totalItems FROM inputinvoice`;
    const [totalResult] = await sequelize.query(totalQuery);
    const totalItems = totalResult[0].totalItems;
    console.log('<< totalItems >>', totalItems);

    return {
      data: results,
      totalItems
    };
  },
  saveInputInvoice: async (invoiceData) => {
    try {
      const query = `
        INSERT INTO InputInvoice (invoiceDate, totalAmount,  linkPdf)
        VALUES (:invoiceDate, :totalAmount, :linkPdf)
      `;
      
      const [result] = await sequelize.query(query, {
        replacements: {
          invoiceDate: invoiceData.invoiceDate,
          totalAmount: invoiceData.totalAmount,
          linkPdf: invoiceData.linkPdf
        }
      });

      return result;
    } catch (error) {
      console.error('Error saving input invoice:', error);
      throw new Error('Error saving input invoice: ' + error.message);
    }
  }
};

module.exports = inputInvoiceRepository;
