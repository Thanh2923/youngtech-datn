const sequelize = require('../configs/db');

const orderRepository = {
  getPendingOrders: async () => {
    const query = `
      SELECT 
        c.fullName AS customerName,
        o.orderDate,
        o.totalAmount,
        o.paymentMethod,
        o.id
      FROM 
        Customer c
      INNER JOIN 
        \`Order\` o ON c.id = o.customer_id
      WHERE 
        o.status = 'Pending' AND o.flag = true
    `;

    try {
      const [results] = await sequelize.query(query);
      return results;
    } catch (error) {
      console.error('Error fetching pending orders:', error);
      throw error;
    }
  },

  getOrderById: async (orderId) => {
    const query = `
      SELECT 
        o.id AS orderId,
        o.totalAmount,
        o.orderDate,
        o.paymentMethod,
        c.id AS customerId,
        c.fullName,
        c.phoneNumber,
        c.address
      FROM 
        \`Order\` o
      INNER JOIN 
        Customer c ON o.customer_id = c.id
      WHERE 
        o.id = :orderId AND o.flag = true
    `;

    try {
      const [order] = await sequelize.query(query, {
        replacements: { orderId },
        type: sequelize.QueryTypes.SELECT,
      });
      return order;
    } catch (error) {
      console.error('Error fetching order:', error);
      throw error;
    }
  },

  createOrder: async (orderData) => {
    const query = `

      INSERT INTO \`Order\` (totalAmount, status, customer_id)
      VALUES (:totalAmount, :status, :customer_id)
    `;
    const [result] = await sequelize.query(query, {
 
      replacements: { 
        totalAmount: orderData.totalAmount,
        status: orderData.status,
        customer_id: orderData.customer_id, 
  }});
    // Dùng query để lấy ID vừa thêm
    const [orderIdResult] = await sequelize.query(
      'SELECT LAST_INSERT_ID() AS id'
    );
    return orderIdResult[0]?.id;
     // Trả về ID vừa tạo
  },

  updateOrderStatus: async (orderId, newStatus) => {
    const query = `
      UPDATE \`Order\`
      SET status = :newStatus
      WHERE id = :orderId AND flag = true
    `;

    try {
      const [updatedRows] = await sequelize.query(query, {
        replacements: { orderId, newStatus },
        type: sequelize.QueryTypes.UPDATE,
      });

      if (updatedRows === 0) {
        throw new Error(
          'Không tìm thấy đơn hàng hoặc cập nhật trạng thái thất bại.'
        );
      }

      return { message: 'Cập nhật trạng thái đơn hàng thành công' };
    } catch (error) {
      console.error('Lỗi khi cập nhật trạng thái đơn hàng:', error);
      throw error;
    }
  },
};

module.exports = orderRepository;
