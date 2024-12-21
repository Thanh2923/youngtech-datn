import mysql from "mysql2"; 
// Cấu hình kết nối
export const connection = mysql.createConnection({
  host: "localhost", // Thay đổi nếu máy chủ MySQL không phải là localhost
  user: "root", // Thay đổi với tên người dùng của bạn
  password: "04082004", // Thay đổi với mật khẩu của bạn
  database: "Ecommerce", // Tên cơ sở dữ liệu của bạn
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});
