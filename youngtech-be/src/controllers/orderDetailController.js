const orderDetailService = require("../services/orderDetailService");

const orderDetailController = {
// Lấy tất cả chi tiết đơn hàng với phân trang
getAllOrderDetail: async (req, res) => {
  try {
    // Lấy page và limit từ query, mặc định page = 1 và limit = 10 nếu không có
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    // Gọi service với các tham số phân trang
    const result = await orderDetailService.getAllOrderDetail({ offset, limit });

    if (result.data.length === 0) {
      return res.status(404).json({ message: "No order details found" });
    }

    res.status(200).json({
      message: "All Order Details",
      data: result.data,
      pagination: {
        currentPage: page,
        pageSize: limit,
        totalItems: result.totalItems,
        totalPages: Math.ceil(result.totalItems / limit)
      }
    });
  } catch (err) {
    res.status(500).json({ message: "Invalid Order Details", error: err.message });
  }
},


  // Lấy chi tiết đơn hàng theo ID
  getOrderDetailById: async (req, res) => {
    try {
      const id = req.params.id;
      const result = await orderDetailService.getOrderDetailById(id);
      if (!result) {
        return res.status(404).json({ message: "Order detail not found" });
      } 
      res.status(200).json({ message: "Success", data: result });
    } catch (err) {
      res.status(500).json({ message: "Invalid Order Detail", error: err.message });
    }
  },

  // Cập nhật chi tiết đơn hàng
  updateOrderDetail: async (req, res) => {
    try {
      const id = req.params.id;
      const data = req.body; // Dữ liệu cập nhật
      const result = await orderDetailService.updateOrderDetail(id, data);
      if (!result) {
        return res.status(404).json({ message: "Order detail not found for update" });
      } 
      res.status(200).json({ message: "Order detail updated successfully", data: result });
    } catch (err) {
      res.status(500).json({ message: "Invalid Order Detail", error: err.message });
    }
  },

  // Tạo chi tiết đơn hàng mới
  createOrderDetail: async (req, res) => {
    try {
      const data = req.body; // Dữ liệu đơn hàng cần tạo
      const result = await orderDetailService.createOrderDetail(data);
      if (!result) {
        return res.status(400).json({ message: "Order detail creation failed" });
      } 
      res.status(201).json({ message: "Order detail created successfully", data: result });
    } catch (err) {
      res.status(500).json({ message: "Server error", error: err.message });
    }
  },

  // Xóa mềm chi tiết đơn hàng
  deleteOrderDetail: async (req, res) => {
    try {
      const id = req.params.id;
      const result = await orderDetailService.updateOrderDetail(id, { flag: true }); // Đánh dấu là đã xóa mềm
      if (!result) {
        return res.status(404).json({ message: "Order detail not found for delete" });
      } 
      res.status(200).json({ message: "Order detail deleted successfully" });
    } catch (err) {
      res.status(500).json({ message: "Server error", error: err.message });
    }
  },
};

module.exports = orderDetailController;
