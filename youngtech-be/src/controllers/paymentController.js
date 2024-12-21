const paymentService = require('../services/paymentService');
const createPayment = async (req, res) => {
  try {
    const { orderId } = req.body;
    console.log(orderId);
    // Here ! check valid booking id exist
    const booking = await paymentService.booking(orderId);
    console.log(booking.status);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found !' });
    }


    console.log(booking.totalAmount);
    const transaction = await paymentService.createTransaction(
      booking.id,
      booking.totalAmount
    );
    console.log(transaction);
    if (!transaction) {
      return res.status(400).json({ message: 'Failed to create transaction!' });
    }
    // Kiểm tra trạng thái giao dịch
    if (transaction.return_code === 1) {
      // 1: Success
      // Lưu thông tin thanh toán vào bảng Payment
      const dataPayment = {
        order_id: orderId,
        paymentDate: new Date(),
        status: 'Completed',
        paymentMethod: 'ZaloPay',
        amount: booking.totalAmount,
      };
      const newPayment = await paymentService.createPayment(dataPayment);

      // update method payment 
      const updateBooking = await paymentService.updateMethodPayment(
        orderId,
        'ZaloPay'
      );
      if (!updateBooking) {
        return res
          .status(400)
          .json({ message: 'Failed to update booking status!' });
      }
      return res.status(201).json({
        message: 'Payment successful!',
        transaction: transaction,
        payment: newPayment,
      });
    } else {
      return res.status(400).json({
        message: 'Payment failed!',
        transaction: transaction,
      });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};


const PayOs = require('@payos/node');
const payOsClient = new PayOs(
  'e5fbf309-237c-4ad3-8ec9-d6be7616e84a',
  'aef25be0-d3b5-43de-9187-60c7bca23a5a',
  '68c55f15424d562e146d752407a331daa6d02bafa4bbc29634be53866751135b'
);

const YOUR_DOMAIN = 'http://localhost:3000';

// u need pass down the payment method to the payment service
// order_id , amount , returnUrl
const createPaymentPayOs = async (req, res) => {
 
  const { orderId } = req.body;
  console.log(orderId);

  const booking = await paymentService.booking(orderId);
  console.log(booking.status);
  if (!booking) {
    return res.status(404).json({ message: 'Booking not found !' });
  }
  const order = {
    amount: 2000,
    description: 'Chuyển tiền đặt hàng',
    orderCode: orderId,
    returnUrl: `${YOUR_DOMAIN}/payment/success`,
    cancelUrl: `${YOUR_DOMAIN}/payment/cancel`,
  };
  const paymentLink = await payOsClient.createPaymentLink(order);

  const dataPayment = {
    order_id: orderId,
    paymentDate: new Date(),
    status: 'Completed',
    paymentMethod: 'PayOs',
    amount: booking.totalAmount,
  };
  const newPayment = await paymentService.createPayment(dataPayment);
  if (!newPayment) {
    return res.status(500).json({ message: 'Failed to create payment' });
  }
  // update method payment
  const updateBooking = await paymentService.updateMethodPayment(
    orderId,
    'PayOs'
  );
  if (!updateBooking) {
    return res.status(500).json({ message: 'Failed to update method payment' });
  }
  return res.json({
    message: 'Tạo link thanh toán thành công',
    result: {
      checkoutURL: paymentLink.checkoutUrl,
    },
  });
};


module.exports = { createPayment,createPaymentPayOs };
