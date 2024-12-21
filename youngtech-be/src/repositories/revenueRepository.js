const sequelize = require('../configs/db');

const revenueRepository = {
    getRevenue: async ({ startDate, endDate }) => {
      console.log('namgg',  startDate, endDate);
      
        try {
            // Chạy câu lệnh SQL Native với tham số
            const result = await sequelize.query(
              `SELECT 
                  o.orderDate,
                  SUM(o.totalAmount) AS totalAmount, 
                  SUM(o.totalAmount - (od.unitPrice * od.quantity)) AS totalProfit
              FROM 
                  \`Order\` o
              JOIN 
                  \`OrderDetail\` od ON o.id = od.order_id
              JOIN 
                  \`Product\` p ON od.product_id = p.id
              WHERE 
                  o.orderDate BETWEEN :startDate AND :endDate
                  AND o.status = 'Success'
              GROUP BY 
                  o.orderDate

              UNION ALL

              SELECT 
                  'Total' AS orderDate, 
                  SUM(o.totalAmount) AS totalAmount, 
                  SUM(o.totalAmount - (od.unitPrice * od.quantity)) AS totalProfit
              FROM 
                  \`Order\` o
              JOIN 
                  \`OrderDetail\` od ON o.id = od.order_id
              JOIN 
                  \`Product\` p ON od.product_id = p.id
              WHERE 
                  o.orderDate BETWEEN :startDate AND :endDate
                  AND o.status = 'Success'`,
              {
                replacements: { startDate, endDate },
                type: sequelize.QueryTypes.SELECT // Chỉ định đây là truy vấn SELECT
              }
            );

            // Nếu không có kết quả trả về, trả về đối tượng mặc định
            if (!result || result.length === 0) {
                return [{ orderDate: 'Total', totalAmount: 0, totalProfit: 0 }];
            }

            return result; // Trả về toàn bộ kết quả, bao gồm cả thống kê theo từng ngày và tổng
          } catch (error) {
            console.error(error);
            throw new Error('Error fetching sales stats');
          }
    },
};
    
module.exports = revenueRepository;