const cartRepository = require('../repositories/cartRepository');

const cartService = {
  addCustomerToCart: async (customer_id) => {
    return await cartRepository.addCustomerToCart(customer_id);
  },

  //checkProduct

  getCustomerIdByAccountId: async (user_id) => {
    return await cartRepository.getCustomerIdByAccountId(user_id);
  },
  // checkCartItem

  checkCartItem: async (cart_id, product_id) => {
    return await cartRepository.checkCartItem(cart_id, product_id);
  },

  // updateQuantity

  updateQuantity: async (quantity, cart_id) => {
    return await cartRepository.updateQuantity(quantity, cart_id);
  },

  //   addProToCart(quantity , cart_id , product_id)
  addProToCart: async (quantity, cart_id, product_id) => {
    return await cartRepository.addProToCart(quantity, cart_id, product_id);
  },

  //checkCustomer(customer_id)

  checkCustomer: async (customer_id) => {
    return await cartRepository.checkCustomer(customer_id);
  },

  // viewCart

  viewCart: async (cartId) => {
    return await cartRepository.viewCart(cartId);
  },

  // getCustomerId(userId)

  getCustomerId: async (userId) => {
    return await cartRepository.getCustomerId(userId);
  },

  // getCartId(getCustomerId)
  getCartId: async (getCustomerId) => {
    return await cartRepository.getCartId(getCustomerId);
  },

  // removeProduct(productId)
  removeProduct: async (productId, getCartIdByCustomerId) => {
    return await cartRepository.removeProduct(productId, getCartIdByCustomerId);
  },

  // checkCartItem
  checkProductExist: async (productId) => {
    return await cartRepository.checkProductExist(productId);
  },

  // checkCustomerId(productId)
  checkCustomerId: async (userId) => {
    return await cartRepository.checkCustomerId(userId);
  },
  // getCartIdByCustomerId(customerId)

  getCartIdByCustomerId: async (customerId) => {
    return await cartRepository.getCartIdByCustomerId(customerId);
  },

  // checkCustomerExistInCart(getCustomerId)
  checkCustomerExistInCart: async (getCustomerId) => {
    return await cartRepository.checkCustomerExistInCart(getCustomerId);
  },

  // checkUserExist(userId)
  checkUserExist: async (userId) => {
    return await cartRepository.checkUserExist(userId);
  },

  // getIdCart
  getIdCart: async (customerId) => {
    return await cartRepository.getIdCart(customerId);
  },

  // updateProduct(getProductId)
  updateProduct: async (quantity, getProductId) => {
    return await cartRepository.updateProduct(quantity, getProductId);
  },

  // checkUserIdExist(userId)
  checkUserIdExist: async (userId) => {
    return await cartRepository.checkUserIdExist(userId);
  },
  //getCartId(checkUserIdExist)
  getCartId: async (checkUserIdExist) => {
    return await cartRepository.getCartId(checkUserIdExist);
  },

  // getOrder(getCartId)
  getOrder: async (getCartId) => {
    return await cartRepository.getOrder(getCartId);
  },

  // check product in stock
  checkStock: async (product_id) => {
    return await cartRepository.checkStock(product_id);
  },

  // add product to order
  addProductToOrder: async (totalAmount, customerId) => {
    return await cartRepository.addProductToOrder(totalAmount, customerId);
  },

  // clearUpdateCart(getCartId)
  clearUpdateCart: async (getCartId) => {
    return await cartRepository.clearUpdateCart(getCartId);
  },

  // addProductOrderDetail(getCartId)

  addProductOrderDetail: async (getCartId) => {
    return await cartRepository.addProductOrderDetail(getCartId);
  },

  // getCart(customerId)
  getCart: async (customerId, productIds) => {
    return await cartRepository.getCart(customerId, productIds);
  },
  // checkAllProductIdExist(productId)
  checkAllProductIdExist: async (productId) => {
    return await cartRepository.checkAllProductIdExist(productId);
  },
  cartId: async (getCustomerId) => {
    return await cartRepository.cartId(getCustomerId);
  },
  deleteIn: async (productId, cartId) => {
    return await cartRepository.deleteIn(productId, cartId);
  },

  removeAll: async (getCartId) => {
    return await cartRepository.removeAll(getCartId);
  },


  removeCart : async (cartId) => {
    return await cartRepository.removeCart(cartId) 
  },
  removeAllCartItem : async (cartId) => {
    return await cartRepository.removeAllCartItem(cartId) 
  }
};

module.exports = cartService;
