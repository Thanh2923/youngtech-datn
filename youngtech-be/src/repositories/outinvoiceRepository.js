// outinvoiceRepository.js
const sequelize = require('../configs/db');
const upload = require('../configs/cloudinary');
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const { Readable } = require('stream');

const outInvoiceRepository = {
  getAllOutInvoices: async ({ offset, limit }) => {
    let query = `
    SELECT 
        oi.id AS outInvoice_id,
        oi.customer_id, 
        oi.linkPdf,
        o.id AS order_id,
        od.quantity,
        p.productName,
        p.productPrice
    FROM 
        outinvoice oi
    JOIN 
        \`order\` o ON oi.order_id = o.id
    JOIN 
        orderdetail od ON o.id = od.order_id
    JOIN 
        product p ON od.product_id = p.id
    `;
    let replacements = {};

    // Ensure limit and offset are numbers
    if (limit) {
      limit = Number(limit);
      if (offset) {
        offset = Number(offset);
        query += ` LIMIT :limit OFFSET :offset`;
        replacements = { limit, offset };
      } else {
        query += ` LIMIT :limit`;
        replacements = { limit };
      }
    }

    try {
      const [result] = await sequelize.query(query, {
        replacements: replacements,
      });

      const totalQuery = `SELECT COUNT(*) AS totalItems FROM outinvoice`;
      const [totalResult] = await sequelize.query(totalQuery);
      const totalItems = totalResult[0].totalItems;

      return {
        data: result,
        totalItems,
      };
    } catch (error) {
      console.error('Error executing query:', error);
      throw error; // re-throw error for handling in the upper layer
    }
  },

  getOutInvoiceById: async (id) => {
    const query = `SELECT * FROM outinvoice WHERE id = :id`;
    const [result] = await sequelize.query(query, { replacements: { id } });
    return result[0]; // Trả về bản ghi nếu tìm thấy
  },

  uploadPDFToCloudinary: async (pdfBlob, fileName) => {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { resource_type: 'raw', folder: 'BANK', public_id: fileName },
        (error, result) => {
          if (error) {
            reject(error);
            console.log(error);
          } else {
            resolve(result.secure_url); // URL được lưu sau upload
          }
        }
      );

      // Tạo Stream từ Blob và upload lên Cloudinary
      const readableStream = Readable.from(Buffer.from(pdfBlob));
      readableStream.pipe(uploadStream);
    });
  },

  createOutInvoice: async (data) => {
    console.log(data.linkPdf);

    const { linkPdf, order_id, customer_id } = data;

    // if (!linkPdf) {
    //   throw new Error('PDF link is required from Frontend!');
    // }
    // const blobResponse = await fetch(linkPdf);
    // console.log(` blobResponse >>` ,blobResponse )
    // const pdfBlob = await blobResponse.arrayBuffer(); // Lấy file PDF dưới dạng buffer
    // console.log(`pdfBlob` , pdfBlob)
    // const fileName = `invoice_${Date.now()}`; // Đặt tên file
      
    // // 2. Upload file PDF lên Cloudinary
    // const cloudinaryUrl = await outInvoiceRepository.uploadPDFToCloudinary(
    //   pdfBlob,
    //   fileName
    // );

    const query = `INSERT INTO outinvoice (linkPdf, order_id, customer_id)
                       VALUES (:linkPdf, :order_id, :customer_id)`;
    const [result] = await sequelize.query(query, {
      replacements: { linkPdf: cloudinaryUrl , order_id, customer_id },
    });
    return result;
  },

  deleteOutInvoice: async (id) => {
    const query = `DELETE FROM  outinvoice WHERE id = :id`;
    const [result] = await sequelize.query(query, { replacements: { id } });
    return result;
  },
};

module.exports = outInvoiceRepository;
