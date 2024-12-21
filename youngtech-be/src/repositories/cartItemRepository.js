const sequelize = require('../configs/db');

const cartItemRepository = {
  // Lấy tất cả các cart items
  getAllCartItem: async () => {
    const query = `SELECT * FROM CartItem`;
    const [result] = await sequelize.query(query);
    return result;
  },

  // Lấy cart item theo id
  getCartItemById: async (id) => {
    const query = `SELECT * FROM CartItem WHERE id = :id`;
    const [result] = await sequelize.query(query, {
      replacements: { id },
    });
    return result[0];
  },

  // Tạo mới cart item
  createCartItem: async (data) => {
    const query = `INSERT INTO CartItem (quantity, cart_id, product_id) 
                   VALUES (:quantity, :cart_id, :product_id)`;
    const [result] = await sequelize.query(query, {
      replacements: {
        quantity: data.quantity,
        cart_id: data.cart_id,
        product_id: data.product_id,
      },
    });
    return result;
  },

  // Xóa cart item theo id (xóa cứng)
  deleteCartItem: async (id) => {
    const query = `DELETE FROM CartItem WHERE id = :id`;
    const [result] = await sequelize.query(query, {
      replacements: { id },
    });
    return result.affectedRows > 0;
  },

  // Cập nhật cart item
  updateCartItem: async (id, data) => {
    const query = `UPDATE CartItem 
                   SET quantity = :quantity, 
                       cart_id = :cart_id, 
                       product_id = :product_id 
                   WHERE id = :id`;
    const [result] = await sequelize.query(query, {
      replacements: {
        id,
        quantity: data.quantity,
        cart_id: data.cart_id,
        product_id: data.product_id,
      },
    });
    return result.affectedRows > 0;
  },

  // Xóa tất cả các cart items sau khi đặt hàng
  clearCartItemsAfterOrder: async (cartId) => {
    const query = `DELETE FROM CartItem WHERE cart_id = :cart_id`;
    const [result] = await sequelize.query(query, {
      replacements: { cart_id: cartId },
    });
    return result.affectedRows > 0;
  },
};

module.exports = cartItemRepository;
