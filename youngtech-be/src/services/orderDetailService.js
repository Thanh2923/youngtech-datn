const orderDetailRepository = require("../repositories/orderDetailRepository");

const orderDetailService = {
    // Lấy tất cả chi tiết đơn hàng
    getAllOrderDetail: async ({ offset, limit }) => {
        return await orderDetailRepository.getAllOrderDetail({ offset, limit });
      },
      

    // Lấy chi tiết đơn hàng theo ID
    getOrderDetailById: async (id) => {
        return await orderDetailRepository.getOrderDetailById(id);
    },

    // Tạo chi tiết đơn hàng
    createOrderDetail: async (data) => {
        // Kiểm tra xem dữ liệu có đầy đủ không (ví dụ: order_id, product_id phải tồn tại)
        if (!data.order_id || !data.product_id) {
            throw new Error("Order ID and Product ID are required to create an order detail.");
        }
        return await orderDetailRepository.createOrderDetail(data);
    },

    // Cập nhật chi tiết đơn hàng
    updateOrderDetail: async (id, data) => {
        // Có thể thêm kiểm tra ở đây nếu cần
        return await orderDetailRepository.updateOrderDetail(id, data);
    },

    // Xóa mềm chi tiết đơn hàng
    deleteOrderDetail: async (id) => {
        const data = { flag: true };
        const result = await orderDetailRepository.deleteOrderDetail(id, data);
        if (!result) {
            throw new Error("Order detail not found for deletion."); // Thông báo lỗi nếu không tìm thấy chi tiết
        }
        return result;
    },
};

module.exports = orderDetailService;
