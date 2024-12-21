const cart = require('../routes/cart');
const cartService = require('../services/cartService');
const cartController = {
  addProductToCart: async (req, res) => {
    try {
      const user_id = req.user.id;
      console.log(user_id);
      const { quantity, product_id } = req.body;
      const customer_id = await cartService.getCustomerIdByAccountId(user_id);
      console.log(`customer_id`, customer_id);
      const checkCustomer = await cartService.checkCustomer(customer_id);

      let cartId;

      if (checkCustomer) {
        console.log('Customer already has a cart.');

        cartId = checkCustomer.id;
      } else {
        const addCustomerToCart = await cartService.addCustomerToCart(
          customer_id
        );
        console.log(`addCustomerToCart`, addCustomerToCart);
        if (!addCustomerToCart) {
          return res
            .status(403)
            .json({ message: 'Can not add to cart , Please check again !' });
        }
        cartId = addCustomerToCart.id;
      }

      //check product in stock

      const checkStock = await cartService.checkStock(product_id);
      console.log(`Stock `, checkStock);
      if (!checkStock || checkStock < quantity) {
        return res.status(403).json({
          message: 'Insufficient stock ! Please reduce quantity product !',
        });
      }

      // check if product is already in the cart
      const checkCartItem1 = await cartService.checkCartItem(
        cartId,
        product_id
      );
      console.log(checkCartItem1);
      if (checkCartItem1) {
        // if true update quantity
        const updateQuantity = checkCartItem1.quantity + quantity;

        if (updateQuantity > checkStock) {
          return res
            .status(403)
            .json({ message: 'Product in stock are not enough !' });
        }

        return res.json({
          message: await cartService.updateQuantity(
            updateQuantity,
            checkCartItem1.id
          ),
        });
      } else {
        // create new cart item
        const addProToCart = await cartService.addProToCart(
          quantity,
          cartId,
          product_id
        );
        console.log(addProToCart);

        if (addProToCart) {
          return res.status(200).json({ message: addProToCart });
        } else {
          return res
            .status(403)
            .json({ message: 'Can not add to cart Please check again !' });
        }
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  viewCart: async (req, res) => {
    try {
     
      const userId = req.user.id;
      const getCustomerId = await cartService.getCustomerId(userId);
      console.log(userId,getCustomerId)
      if (!getCustomerId) {
        return res.status(404).json({ message: 'customer id not found!' });
      }
      // //after get cart id check customer exist in cart
      const checkCustomerExistInCart =
        await cartService.checkCustomerExistInCart(getCustomerId);
      if (!checkCustomerExistInCart) {
        return res.status(404).json({ message: 'Please add to cart' });
      }
      // get cart id
      const cartId = await cartService.getCartId(getCustomerId);
      if (!cartId) {
        return res.status(404).json({ message: 'cart id not found!' });
      }
  
      const result = await cartService.viewCart(cartId);
      if (!result) {
        return res.status(404).json({ message: 'Not found cart' });
      }
      if (result.length === 0) {
        return res
          .status(404)
          .json({ message: 'Cart Empty ! Please add product to cart!' });
      }
      res.status(200).json({ message: 'Success', data: result });
    } catch (err) {
      return res.status(500).json({ message: err });
    }
  },

  removeProductId: async (req, res) => {
    try {
      const productId = req.params.productId;
      const userId = req.user.id;
      console.log(`productId ${productId} vs userId ${userId}`);
      if (!productId) {
        return res.status(404).json({ message: 'Product id empty' });
      }
      const customerId = await cartService.checkCustomerId(userId);
      console.log(`customerId ${customerId}`);
      if (!customerId) {
        return res.status(404).json({ message: 'Customer id not exist !' });
      }

      const getCartIdByCustomerId = await cartService.getCartIdByCustomerId(
        customerId
      );

      console.log(`cart id ${getCartIdByCustomerId}`);
      if (!getCartIdByCustomerId) {
        return res.status(404).json({ message: 'Cart id  not exist!' });
      }
      console.log(`checkCustomerId ${customerId}`);

      const checkProductExist = await cartService.checkProductExist(productId);
      if (!checkProductExist) {
        return res.status(404).json({ message: 'Product id not exist !' });
      }
      const removeProduct = await cartService.removeProduct(
        productId,
        getCartIdByCustomerId
      );
      if (!removeProduct) {
        return res.status(404).json({ message: 'Can not remove product' });
      }
      res.status(200).json({ message: `Remove product ${productId}` });
    } catch (err) {
      return res.status(500).json({ message: err });
    }
  },
  // edit  cart
  editCart: async (req, res) => {
    try {
      const { quantity, product_id } = req.body;
      console.log(quantity, product_id);
      // get quantity product by cart_id and product_id
      const userId = req.user.id;
      const checkUserExist = await cartService.checkUserExist(userId);
      console.log(`checkUserExist ${checkUserExist}`);
      const getIdCart = await cartService.getIdCart(checkUserExist);
      console.log(getIdCart);
      const getProductId = getIdCart.filter(
        (product) => product.product_id === product_id
      );
      const updateProduct = await cartService.updateProduct(
        quantity,
        getProductId[0]
      );
      console.log(updateProduct);
      if (!updateProduct) {
        return res
          .status(404)
          .json({ message: 'Can not update product !Please check again .' });
      }
      res.status(200).json({ message: updateProduct });
    } catch (err) {
      res.status(500).json({ message: err });
    }
  },

  addProductToOrder: async (req, res) => {
    try {
      /// get id
      const userId = req.user.id;
      // check userId exist
      const checkUserIdExist = await cartService.checkUserIdExist(userId);
      console.log(checkUserIdExist);
      if (!checkUserIdExist) {
        return res.status(404).json({ message: 'Customer not found !' });
      }
      ///
      const getCartId = await cartService.getCartId(checkUserIdExist);
      console.log(getCartId);
      if (!getCartId) {
        return res.status(404).json({ message: 'Cart id not found !' });
      }
      const getOrder = await cartService.getOrder(getCartId);

      if (!getOrder) {
        return res.status(404).json({ message: 'order not found !' });
      }
      const total = getOrder.reduce((sum, item) => {
        return sum + item.quantity * parseInt(item.price, 10);
      }, 0);
      console.log(`Amount total : ${total}`);

      // add  order
      const addProductToOrder = await cartService.addProductToOrder(
        total,
        checkUserIdExist
      );
      //then  add product to order detail
      const addProductOrderDetail = await cartService.addProductOrderDetail(
        getCartId
      );

      console.log(addProductToOrder);
      if (!addProductToOrder) {
        return res.status(403).json({
          message: 'Can not add to product order . Please check again !',
        });
      }
      // Clear or update cart

      await cartService.clearUpdateCart(getCartId);

      res.status(200).json({ message: addProductToOrder });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  },

  getCartId: async (userId) => {
    const checkUser = await cartService.checkUserExist(userId);
    if (!checkUser) {
      return res.status(404).json({ message: 'User not exist' });
    }
    console.log(`user id ${checkUser}`);

    const getCustomerId = await cartService.checkCustomer(checkUser);
    if (!getCustomerId) {
      return res.status(404).json({ message: 'Customer not exist' });
    }
    return getCustomerId.id;
  },
  removeIn: async (req, res) => {
    try {
     const {productId } = req.body;
      const userId = req.user.id;
      console.log("userId",userId,productId);
      const customerId = await cartService.checkCustomerId(userId);
      console.log(`customerId ${customerId}`);
      if (!customerId) {
        return res.status(404).json({ message: 'Customer id not exist !' });
      }
      const getCartIdByCustomerId = await cartService.getCartIdByCustomerId(
        customerId
      );

      console.log(`cart id ${getCartIdByCustomerId}`);
      if (!getCartIdByCustomerId) {
        return res.status(404).json({ message: 'Cart id  not exist!' });
      }
      
      const deleteIn = await cartService.deleteIn(productId,getCartIdByCustomerId);

      if (!deleteIn) {
        return res.status(403).json({ message: 'fail' });
      }
      res.status(200).json({ message: 'success' });
     
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  removeAll: async (req, res) => {
    try {
      const userId = req.user.id;
      console.log("userId",userId);
      const customerId = await cartService.checkCustomerId(userId);
      console.log(`customerId ${customerId}`);
      if (!customerId) {
        return res.status(404).json({ message: 'Customer id not exist !' });
      }
      const getCartIdByCustomerId = await cartService.getCartIdByCustomerId(
        customerId
      );

      console.log(`cart id ${getCartIdByCustomerId}`);
      if (!getCartIdByCustomerId) {
        return res.status(404).json({ message: 'Cart id  not exist!' });
      }
      const deleteAll = await cartService.removeAllCartItem(getCartIdByCustomerId);
      if (!deleteAll) {
        return res
          .status(403)
          .json({ message: 'can not delete all product in cart' });
      }
      res.status(200).json({ message: 'delete all product in cart' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};
module.exports = cartController;
