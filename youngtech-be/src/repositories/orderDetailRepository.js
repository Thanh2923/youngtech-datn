const sequelize = require('../configs/db');

const orderDetailRepository = {
  getAllOrderDetail: async ({ offset, limit }) => {
    const query = `SELECT * FROM orderdetail LIMIT :limit OFFSET :offset`;
    const [result] = await sequelize.query(query, {
      replacements: { limit, offset },
    });

    // Truy vấn tổng số bản ghi để tính tổng số trang
    const countQuery = `SELECT COUNT(*) as total FROM orderdetail`;
    const [countResult] = await sequelize.query(countQuery);

    return {
      data: result,
      totalItems: countResult[0].total,
    };
  },
  getOrderDetailById: async (id) => {
    const query = `SELECT * FROM orderdetail WHERE id = :id`;
    const [result] = await sequelize.query(query, { replacements: { id } });
    return result[0];
  },

  createOrderDetailOff: async (orderDetailData) => {
    const query = `
        INSERT INTO \`OrderDetail\` (unitPrice, quantity, order_id, product_id)
        VALUES (:unitPrice, :quantity, :order_id, :product_id)
      `;

    // Kiểm tra log dữ liệu đầu vào
    console.log('Creating OrderDetail with data:', orderDetailData);

    const initPrice =
      orderDetailData.productRetailPrice * orderDetailData.productSalePrice;

    await sequelize.query(query, {
      replacements: {
        unitPrice: initPrice,
        quantity: orderDetailData.quantity,
        order_id: orderDetailData.order_id, // Đảm bảo truyền đúng order_id
        product_id: orderDetailData.id,
      },
    });
  },


  createOrderDetail: async (orderDetailData) => {
    const query = `
        INSERT INTO \`OrderDetail\` (unitPrice, quantity, order_id, product_id)
        VALUES (:unitPrice, :quantity, :order_id, :product_id)
      `;

    // Kiểm tra log dữ liệu đầu vào
    console.log('Creating OrderDetail with data:', orderDetailData);

    await sequelize.query(query, {
      replacements: {
        unitPrice: orderDetailData.unitPrice,
        quantity: orderDetailData.quantity,
        order_id: orderDetailData.order_id, // Đảm bảo truyền đúng order_id
        product_id: orderDetailData.product_id,
      },
    });
  },
  deleteOrderDetail: async (id, data) => {
    const query = `UPDATE orderdetail SET flag = true WHERE id = :id`;
    const [result] = await sequelize.query(query, {
      replacements: { ...data, id },
    });
    return result;
  },
  updateOrderDetail: async (id, data) => {
    const query = `UPDATE orderdetail 
                       SET unitPrice = :unitPrice, description = :description, quantity = :quantity order_id = :order_id, product_id = :product_id
                       WHERE id = :id`;
    const [result] = await sequelize.query(query, {
      replacements: { ...data, id },
    });
    return result;
  },
};

module.exports = orderDetailRepository;
