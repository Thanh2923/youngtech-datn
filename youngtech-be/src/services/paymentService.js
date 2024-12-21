const paymentRepository = require('../repositories/paymentRepository')
const paymentService = {
    booking : async (orderId) => {
        return await paymentRepository.booking(orderId);
    },
    createTransaction : async (orderId, totalAmount) => {
        return await paymentRepository.createTransaction(orderId, totalAmount);
    },
    createPayment : async (dataPayment) => {
        return await paymentRepository.createPayment(dataPayment);
    },
    updateMethodPayment : async (orderId , method) => {
        return await paymentRepository.updateMethodPayment(orderId, method);
    }
}
module.exports = paymentService