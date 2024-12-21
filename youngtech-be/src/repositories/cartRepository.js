const { query } = require('express');
const sequelize = require('../configs/db');
const cartRepository = {
  addCustomerToCart: async (customer_id) => {
    const query = `INSERT INTO cart (customer_id) values (:customer_id)`;
    const [result] = await sequelize.query(query, {
      replacements: { customer_id },
    });

    const [cart] = await sequelize.query(
      `SELECT * FROM cart WHERE customer_id =:customer_id`,
      { replacements: { customer_id } }
    );
    return cart[0];
  },

  //checkProduct

  getCustomerIdByAccountId: async (user_id) => {
    const query = `SELECT * FROM customer WHERE account_id = :account_id`;
    const [result] = await sequelize.query(query, {
      replacements: { account_id: user_id },
    });
    return result[0].id;
  },

  //checkCartItem

  checkCartItem: async (cart_id, product_id) => {
    const query = `SELECT * FROM cartitem WHERE  product_id=:product_id AND cart_id =:cart_id`;
    const [result] = await sequelize.query(query, {
      replacements: { product_id, cart_id },
    });
    return result[0];
  },

  //updateQuantity
  updateQuantity: async (quantity, cart_id) => {
    const query = `update cartitem set quantity = :quantity WHERE id= :id `;
    const [result] = await sequelize.query(query, {
      replacements: { quantity: quantity, id: cart_id },
    });
    return result;
  },

  // addProToCart(quantity , cart_id , product_id)
  addProToCart: async (quantity, cart_id, product_id) => {
    const query = `INSERT INTO cartitem (quantity , cart_id , product_id) values (:quantity , :cart_id , :product_id)`;
    const [result] = await sequelize.query(query, {
      replacements: { quantity, cart_id, product_id },
    });
    return result;
  },

  // checkCustomer(customer_id)
  checkCustomer: async (customer_id) => {
    const query = `SELECT * FROM cart WHERE customer_id = :customer_id`;
    const [result] = await sequelize.query(query, {
      replacements: { customer_id },
    });
    return result[0];
  },

  // viewCart

  viewCart: async (cartId) => {
    const query = `
      SELECT
        cartitem.id AS id,
        cartitem.quantity,
        cartitem.cart_id,
        product.id AS product_id,
        product.productName AS productName,
        product.description,
        product.productPrice AS productPrice,
        product.productRetailPrice AS productRetailPrice,
        product.productSalePrice AS productSalePrice,
        GROUP_CONCAT(image.imageUrl) AS images
      FROM cartitem
      JOIN product ON cartitem.product_id = product.id
      LEFT JOIN image ON product.id = image.product_id
      WHERE cartitem.cart_id = :cartId
      GROUP BY
        cartitem.id, cartitem.quantity, cartitem.cart_id, product.id, product.productName, product.description, product.productPrice;
    `;
  
    // Đảm bảo sử dụng đúng tên parameter
    const [formattedResult] = await sequelize.query(query, {
      replacements: { cartId }, // Thay thế :cartId bằng cartId
    });
  
    // Kiểm tra nếu formattedResult là mảng và map kết quả
    const result = Array.isArray(formattedResult) ? formattedResult.map(item => ({
      ...item,
      images: item.images ? item.images.split(',') : [] // Nếu có ảnh, tách chuỗi thành mảng, nếu không có ảnh thì trả mảng rỗng
    })) : [];
  
    return result;
  },
  
  // getCustomerId(userId)

  getCustomerId: async (userId) => {
    const query = `SELECT * FROM customer WHERE account_id = :account_id`;
    const [result] = await sequelize.query(query, {
      replacements: { account_id: userId },
    });
    return result[0].id;
  },

  // getCartId(getCustomerId)
  getCartId: async (getCustomerId) => {
    const query = `SELECT * FROM cart WHERE customer_id = :customer_id`;
    const [result] = await sequelize.query(query, {
      replacements: { customer_id: getCustomerId },
    });
    return result[0].id;
  },
  // removeProduct

  removeProduct: async (productId, cartId) => {
    const query = `DELETE  FROM cartitem WHERE product_id = :product_id  AND cart_id = :cart_id`;
    const [result] = await sequelize.query(query, {
      replacements: { product_id: productId, cart_id: cartId },
    });
    return result.affectedRows > 0;
  },

  //checkCartItem
  checkProductExist: async (productId) => {
    const query = `SELECT * FROM product WHERE id= :id `;
    const [result] = await sequelize.query(query, {
      replacements: { id: productId },
    });
    return result[0];
  },

  // checkCustomerId(productId)
  checkCustomerId: async (userId) => {
    const query = `SELECT * FROM customer WHERE account_id = :account_id`;
    const [result] = await sequelize.query(query, {
      replacements: { account_id: userId },
    });
    return result[0].id;
  },

  getCartIdByCustomerId: async (customerId) => {
    const query = `SELECT * FROM cart WHERE customer_id = :customer_id`;
    const [result] = await sequelize.query(query, {
      replacements: { customer_id: customerId },
    });
    return result[0].id;
  },

  // checkCustomerExistInCart(getCustomerId)
  checkCustomerExistInCart: async (getCustomerId) => {
    const query = `SELECT * FROM cart WHERE customer_id = :customer_id`;
    const [result] = await sequelize.query(query, {
      replacements: { customer_id: getCustomerId },
    });
    return result[0];
  },

  // checkUserExist(userId)
  checkUserExist: async (userId) => {
    const query = `SELECT * FROM customer WHERE account_id = :account_id`;
    const [result] = await sequelize.query(query, {
      replacements: { account_id: userId },
    });
    return result[0].id;
  },

  getIdCart: async (customerId) => {
    const query = `
    SELECT 
    cart.id AS cart_id, 
    cartitem.quantity ,
    cartitem.product_id 
     FROM cart 
     JOIN cartitem ON cart.id = cartitem.cart_id
     WHERE customer_id = :customer_id`;
    const [result] = await sequelize.query(query, {
      replacements: { customer_id: customerId },
    });
    return result;
  },

  // updateProduct(getProductId)
  updateProduct: async (quantity, getProductId) => {
    const query = `UPDATE  cartitem SET quantity = :quantity WHERE product_id = :product_id`;
    const [result] = await sequelize.query(query, {
      replacements: { quantity: quantity, product_id: getProductId.product_id },
    });
    return result;
  },

  //checkUserIdExist(userId)
  checkUserIdExist: async (userId) => {
    const query = `SELECT * FROM customer WHERE account_id=:account_id`;
    const [result] = await sequelize.query(query, {
      replacements: { account_id: userId },
    });
    return result[0].id;
  },

  getCartId: async (checkUserIdExist) => {
    const query = `SELECT * FROM cart WHERE customer_id= :customer_id `;
    const [result] = await sequelize.query(query, {
      replacements: { customer_id: checkUserIdExist },
    });
    return result[0].id;
  },

  getOrder: async (getCartId) => {
    const query = `SELECT 
    cartitem.id AS cartitem_id,
    cartitem.quantity AS quantity,
    product.productName AS productName , 
    product.productPrice AS price,
    product.quantity AS productQuantity,
    image.imageUrl AS imageUrl
    FROM cartitem 
    JOIN product ON cartitem.product_id = product.id 
    LEFT JOIN image ON product.id  = image.id
    WHERE cart_id = :cart_id 
    `;
    const [result] = await sequelize.query(query, {
      replacements: { cart_id: getCartId },
    });
    return result;
  },

  // checkStock(updateQuantity)
  checkStock: async (product_id) => {
    const query = `SELECT *  FROM product WHERE id=:id`;
    const [result] = await sequelize.query(query, {
      replacements: { id: product_id },
    });
    return result[0].quantity;
  },

  // addProductToOrder(totalAmount, customerId)
  addProductToOrder: async (totalAmount, customerId) => {
    console.log(totalAmount, customerId);
    const query = `INSERT INTO \`order\` (totalAmount , customer_id) 
    VALUES (:totalAmount , :customer_id) `;
    const [result] = await sequelize.query(query, {
      replacements: { totalAmount: totalAmount, customer_id: customerId },
    });
    return result;
  },

  // clearUpdateCart(getCartId)
  clearUpdateCart: async (getCartId) => {
    const query = `DELETE FROM cart WHERE id=:id`;
    const [result] = await sequelize.query(query, {
      replacements: { id: getCartId },
    });

    const query2 = `DELETE FROM cartitem WHERE cart_id =:cart_id`;
    const [result2] = await sequelize.query(query2, {
      replacements: { cart_id: getCartId },
    });
    return result.affectedRows > 0;
  },

  // addProductOrderDetail(getCartId)

  addProductOrderDetail: async (getCartId) => {
    const query = `
    SELECT 
    cartitem.id AS cartId 
    FROM cartitem WHERE id = :id;
    `;
  },

  getCart: async (customerId, productIds) => {
    try {
      const query = `SELECT * FROM cart WHERE customer_id = :customer_id`;
      const [result] = await sequelize.query(query, {
        replacements: { customer_id: customerId },
      });
      const cartId = result[0].id;
      const query2 = `SELECT 
                       product_id ,
                       quantity  
                       FROM cartitem 
                       WHERE cart_id = :cart_id `;
      const [result2] = await sequelize.query(query2, {
        replacements: { cart_id: cartId },
      });

      const updateCart = result2.filter((item) =>
        productIds.includes(item.product_id)
      );
      let showResult = 0;
      for (const removeCart of updateCart) {
        const query3 = `DELETE FROM cartitem WHERE cart_id = :cart_id AND product_id =:product_id`;
        const [result3] = await sequelize.query(query3, {
          replacements: { cart_id: cartId, product_id: removeCart.product_id },
        });
        showResult += result3.affectedRows;
      }

      return showResult;
    } catch (err) {
      console.error(err);
      throw Error(err.message);
    }
  },

  // checkAllProductIdExist(productId)
  checkAllProductIdExist: async (productId) => {
    const query = `SELECT * FROM cartitem WHERE product_id = :product_id`;
  },

  cartId: async (getCustomerId) => {
    const query = `SELECT id FROM cart WHERE customer_id = :customer_id`;
    const [result] = await sequelize.query(query, {
      replacements: { customer_id: getCustomerId },
    });
    return result[0].id;
  },
  deleteIn: async (productId, cartId) => {
    try { 
      const uniqueProduct = [...new Set(productId)];
      console.log(uniqueProduct);
      const query = `DELETE FROM cartitem  WHERE product_id IN (?) AND cart_id = ?`;
      const [result] = await sequelize.query(query, {
        replacements: [uniqueProduct, cartId],
      });
      return result.affectedRows > 0;
    } catch (error) {
      console.error(error);
      throw Error(error.message);
    }

  }, 
  removeCart : async (cartId) => {
    const query = `DELETE FROM cart WHERE id = :cart_id`
    const [result] = await sequelize.query(query, {replacements : {cart_id : cartId}})
    return result.affectedRows> 0
  },

  removeAllCartItem : async (cartId) => {
    const query = `DELETE FROM cartItem WHERE cart_id = :cart_id`
    const [result] = await sequelize.query(query, {replacements : {cart_id : cartId}})
    return result.affectedRows> 0
  }
};

module.exports = cartRepository;
