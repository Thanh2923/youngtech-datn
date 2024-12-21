const sequelize = require('../configs/db');
const imageRepository = require('./imageRepository');

const productRepository = {
  getAllProduct: async ({ offset, limit }) => {
    let query = `SELECT * FROM product WHERE flag = true AND productRetailPrice IS NOT NULL`; // Lấy tất cả sản phẩm
    let replacements = {};

    // Kiểm tra nếu có limit
    if (limit) {
      // Nếu có cả limit và page, tính offset và phân trang
      if (offset) {
        query += ` LIMIT :limit OFFSET :offset`;  // Thêm LIMIT và OFFSET vào query
        replacements = { limit, offset };
      } else {
        // Nếu chỉ có limit mà không có page, lấy limit sản phẩm
        query += ` LIMIT :limit`;
        replacements = { limit };
      }
    }

    // Thực thi truy vấn lấy sản phẩm
    const [result] = await sequelize.query(query, {
      replacements: replacements
    });


    let totalItems = 0;

    // Nếu có limit, tính tổng số sản phẩm để tính tổng số trang

    const totalQuery = `SELECT COUNT(*) AS totalItems FROM product WHERE flag = true AND productRetailPrice IS NOT NULL`;
    const [totalResult] = await sequelize.query(totalQuery);
    totalItems = totalResult[0].totalItems;


    // Nhóm các hình ảnh lại theo product_id
    const productsWithImages = await Promise.all(
      result.map(async (product) => {
        const imagesByProductId = await imageRepository.getAllImagesByProductId(product.id);
        return ({ ...product, images: imagesByProductId })

      })
    )
    // console.log('<< productsWithImages >>', await productsWithImages);
    // Chuyển kết quả thành mảng và   trả về
    // const products = Object.values(productsWithImages);

    return {
      data: productsWithImages,
      totalItems
    };
  },

  viewListProduct: async ({ offset, limit }) => {
    let query = `SELECT * FROM product WHERE flag = true `; // Lấy tất cả sản phẩm
    let replacements = {};

    // Kiểm tra nếu có limit
    if (limit) {
      // Nếu có cả limit và page, tính offset và phân trang
      if (offset) {
        query += ` LIMIT :limit OFFSET :offset`;  // Thêm LIMIT và OFFSET vào query
        replacements = { limit, offset };
      } else {
        // Nếu chỉ có limit mà không có page, lấy limit sản phẩm
        query += ` LIMIT :limit`;
        replacements = { limit };
      }
    }

    // Thực thi truy vấn lấy sản phẩm
    const [result] = await sequelize.query(query, {
      replacements: replacements
    });


    let totalItems = 0;

    // Nếu có limit, tính tổng số sản phẩm để tính tổng số trang

    const totalQuery = `SELECT COUNT(*) AS totalItems FROM product`;
    const [totalResult] = await sequelize.query(totalQuery);
    totalItems = totalResult[0].totalItems;


    // Nhóm các hình ảnh lại theo product_id
    const productsWithImages = await Promise.all(
      result.map(async (product) => {
        const imagesByProductId = await imageRepository.getAllImagesByProductId(product.id);
        return ({ ...product, images: imagesByProductId })

      })
    )
    // console.log('<< productsWithImages >>', await productsWithImages);
    // Chuyển kết quả thành mảng và   trả về
    // const products = Object.values(productsWithImages);

    return {
      data: productsWithImages,
      totalItems
    };
  },

  updatePricesProduct: async (id, data) => {
    // Lọc ra các trường hợp lệ và có giá trị
    const allowedFields = ['productRetailPrice', 'productSalePrice'];
    const updateData = Object.keys(data)
      .filter((key) => allowedFields.includes(key) && data[key] !== undefined)
      .reduce((obj, key) => {
        obj[key] = data[key];
        return obj;
      }, {});

    if (Object.keys(updateData).length === 0) {
      throw new Error('No valid fields to update');
    }

    // Tạo phần SET trong câu lệnh SQL
    const setQuery = Object.keys(updateData)
      .map((key) => `${key} = :${key}`)
      .join(', ');

    const query = `
        UPDATE Product 
        SET ${setQuery}
        WHERE id = :id
      `;

    await sequelize.query(query, {
      replacements: { ...updateData, id },
    });

    return { message: 'Product updated successfully' };
  },

  getProductById: async (id) => {
    const query = `
            SELECT *
            FROM product 
            WHERE id = :id
        `;
    const [result] = await sequelize.query(query, { replacements: { id } });
    const imagesByProductId = await imageRepository.getAllImagesByProductId(id)


    return ({...result[0], images: imagesByProductId});  // Trả về sản phẩm với tất cả các hình ảnh gộp lại trong cột 'imageUrls'
  },



  // Thêm hàm mới để lấy sản phẩm theo childCategory_id
  getProductByChildCategory: async ({ childCategoryId, limit, offset }) => {
    try {
      // Câu truy vấn chính để lấy danh sách sản phẩm
      const query = `
    SELECT * 
    FROM product 
    WHERE childCategory_id = :childCategoryId 
      AND flag = true 
      AND productRetailPrice IS NOT NULL
    ${limit ? 'LIMIT :limit OFFSET :offset' : ''}
`;

      // Câu truy vấn phụ để tính tổng số sản phẩm
      const countQuery = `
             SELECT COUNT(*) as totalItems 
             FROM product 
             WHERE childCategory_id = :childCategoryId 
             AND flag = true 
             AND productRetailPrice IS NOT NULL;
          `;

      // Thực thi câu truy vấn chính
      const [result] = await sequelize.query(query, {
        replacements: {
          childCategoryId,
          limit,
          offset,
        },
      });

      // Thực thi câu truy vấn để lấy tổng số sản phẩm
      const [countResult] = await sequelize.query(countQuery, {
        replacements: { childCategoryId },
      });

      // Nhóm các hình ảnh lại theo product_id
      const productsWithImages = await Promise.all(
        result.map(async (product) => {
          const imagesByProductId = await imageRepository.getAllImagesByProductId(product.id);
          return { ...product, images: imagesByProductId };
        })
      );

      // Trả về kết quả
      return {
        data: productsWithImages, // Danh sách sản phẩm kèm hình ảnh
        totalItems: countResult[0].totalItems, // Tổng số sản phẩm
      };
    } catch (error) {
      console.error('Error in getProductByChildCategory:', error);
      throw error; // Ném lỗi ra ngoài để controller xử lý
    }
  },

  getProductByParentCategory: async ({ parentCategoryId, limit = null, offset = null }) => {
    try {
      // Khởi tạo câu truy vấn cơ bản để lấy dữ liệu sản phẩm
      let query = `
          SELECT p.* 
          FROM product p 
          JOIN childcategories c ON p.childCategory_id = c.id 
          WHERE c.parentCategory_id = :parentCategoryId 
          AND p.flag = true 
          AND p.productRetailPrice IS NOT NULL;
        `;

      // Nếu có limit và offset, thêm các điều kiện phân trang
      if (limit) {
        query += offset !== null ? ` LIMIT :limit OFFSET :offset` : ` LIMIT :limit`;
      }

      // Khởi tạo truy vấn để tính tổng số sản phẩm
      const totalCountQuery = `
          SELECT COUNT(*) as total
          FROM product p
          JOIN childcategories c ON p.childCategory_id = c.id
          WHERE c.parentCategory_id = :parentCategoryId 
          AND p.flag = true 
          AND p.productRetailPrice IS NOT NULL;
        `;

      // Thực thi truy vấn lấy danh sách sản phẩm
      const [result] = await sequelize.query(query, {
        replacements: { parentCategoryId, limit, offset },
      });

      // Thực thi truy vấn để lấy tổng số sản phẩm
      const [[totalCount]] = await sequelize.query(totalCountQuery, {
        replacements: { parentCategoryId },
      });

      // Nhóm các hình ảnh lại theo product_id
      const productsWithImages = await Promise.all(
        result.map(async (product) => {
          const imagesByProductId = await imageRepository.getAllImagesByProductId(product.id);
          return { ...product, images: imagesByProductId };
        })
      );

      // Trả về dữ liệu theo định dạng yêu cầu
      return {
        data: productsWithImages, // Danh sách sản phẩm kèm hình ảnh
        totalItems: totalCount.total, // Tổng số sản phẩm
      };
    } catch (error) {
      console.error('Error in getProductByParentCategory:', error);
      throw error; // Ném lỗi ra ngoài để controller xử lý
    }
  },




  deleteProduct: async (id) => {
    const query = `UPDATE product SET flag = false WHERE id = :id`;
    const [result] = await sequelize.query(query, { replacements: { id } });
    return result;
  },

  restoreProduct: async (id) => {
    const query = `UPDATE product SET flag = false WHERE id = :id`; // Khôi phục xóa mềm
    const [result] = await sequelize.query(query, { replacements: { id } });
    return result;
  },

  getProductByName: async (productName) => {
    const query = `SELECT * FROM product WHERE productName = :productName AND flag = true`;
    const [result] = await sequelize.query(query, {
      replacements: { productName }
    });
    return result[0];
  },


  updateProduct: async (id, data) => {
    const query = `UPDATE product SET quantity = :quantity WHERE id = :id`;
    await sequelize.query(query, { replacements: { ...data, id } });
  },

  editProduct: async (id, data) => {
    console.log(id, data, '12321')
      // Nếu có ID, thực hiện cập nhật sản phẩm
      const updateQuery = `
        UPDATE product 
        SET 
          productName = :productName, 
          quantity = :quantity, 
          description = :description, 
          productPrice = :productPrice, 
          brand = :brand, 
          childCategory_id = :childCategory_id, 
          supplier_id = :supplier_id
        WHERE id = :id
      `;
      await sequelize.query(updateQuery, { replacements: { ...data, id } });
  },

  createProduct: async (productData) => {
    const query = `
          INSERT INTO product (productName, quantity, description, productPrice, brand, childCategory_id, supplier_id, flag, createAt) 
          VALUES (:productName, :quantity, :description, :productPrice, :brand, :childCategory_id, :supplier_id, true, :createAt)
        `;
    productData.createAt = new Date();

    try {
      const [result] = await sequelize.query(query, {
        replacements: productData,
      });

      // Truy vấn lại để lấy `productId` nếu cần
      const [createdProduct] = await sequelize.query(`
            SELECT id AS productId FROM product WHERE productName = :productName AND flag = true
          `, {
        replacements: { productName: productData.productName },
      });

      if (!createdProduct || createdProduct.length === 0) {
        throw new Error('Failed to retrieve productId for the created product');
      }

      return createdProduct[0]; // Trả về `productId`
    } catch (error) {
      console.error('Error creating product:', error);
      throw error;
    }
  }


};






module.exports = productRepository;