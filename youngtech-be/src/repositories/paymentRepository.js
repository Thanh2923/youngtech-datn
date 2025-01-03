const Order = require('../models/orderModel');
const sequelize = require('../configs/db');
const axios = require('axios').default; // npm install axios
const CryptoJS = require('crypto-js'); // npm install crypto-js
const moment = require('moment');
const paymentRepository = {
  booking: async (orderId) => {
    const query = `SELECT * FROM \`Order\` WHERE id = :id`;
    const [result] = await sequelize.query(query, {
      replacements: { id: orderId },
    });
    console.log(`result >>`, result);
    return result[0];
  },
  createTransaction: async (orderId, totalAmount) => {
    try {
      const config = {
        app_id: '2554',
        key1: 'sdngKKJmqEMzvh5QQcdD2A9XBSKUNaYn',
        key2: 'trMrHtvjo6myautxDUiAcYsVtaeQ8nhf',
        endpoint: 'https://sb-openapi.zalopay.vn/v2/create',
      };
      const embed_data = { orderId: orderId };

      const items = [
        {
          item_name: 'Booking', // Example item name
          item_quantity: 1,
          item_price: totalAmount,
        },
      ];
      const transID = Math.floor(Math.random() * 1000000);
      const order = {
        app_id: config.app_id,
        app_trans_id: `${moment().format('YYMMDD')}_${transID}`, // translation missing: vi.docs.shared.sample_code.comments.app_trans_id
        app_user: 'user123',
        app_time: Date.now(), // miliseconds
        item: JSON.stringify(items),
        embed_data: JSON.stringify(embed_data),
        amount: totalAmount,
        description: `Lazada - Payment for the order #${transID}`,
        bank_code: 'zalopayapp',
      };

      // appid|app_trans_id|appuser|amount|apptime|embeddata|item
      const data =
        config.app_id +
        '|' +
        order.app_trans_id +
        '|' +
        order.app_user +
        '|' +
        order.amount +
        '|' +
        order.app_time +
        '|' +
        order.embed_data +
        '|' +
        order.item;
      order.mac = CryptoJS.HmacSHA256(data, config.key1).toString();

      const response = await axios.post(config.endpoint, null, {
        params: order,
      });
      return response.data;
    } catch (err) {
      console.log(err);
      throw Error(err.message);
    }
  },
  createPayment: async (dataPayment) => {
    const query = `INSERT INTO payment (order_id , paymentDate , amount , paymentMethod , status) VALUES (:order_id , :paymentDate , :amount , :paymentMethod , :status)`;
    const [result] = await sequelize.query(query, {
      replacements: { ...dataPayment },
    });
    return result;
  },
  updateMethodPayment: async (orderId, method) => {
    const query = `UPDATE \`Order\` SET paymentMethod = :paymentMethod WHERE id = :id`;
    const [result] = await sequelize.query(query, {
      replacements: { id: orderId, paymentMethod: method },
    });
    return result;
  },
};

module.exports = paymentRepository;
