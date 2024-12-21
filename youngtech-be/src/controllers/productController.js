const imageRepository = require('../repositories/imageRepository');
const imageService = require('../services/imageService');
const productService = require('../services/productService');
const validateProductAttributes = require('../validate/productValidator');

const productController = {
  // gọi  imageService để lấy ra danh sách ảnh, rồi cho danh sách ảnh vào product  
  getAllProduct: async (req, res) => {
    try {

      // Lấy tham số phân trang từ query
      const page = req.query.page ? parseInt(req.query.page) : null;
      const limit = req.query.limit ? parseInt(req.query.limit) : null;
  
      let offset = 0; // Mặc định offset là 0 nếu không có page
  
      // Nếu cả `page` và `limit` đều tồn tại, tính offset
      if (page && limit) {
        offset = (page - 1) * limit;
      }
  
      // Gọi service lấy sản phẩm
      const result = await productService.getAllProduct({ offset, limit });
  
      // Kiểm tra dữ liệu trả về
      if (!result || result.data.length === 0) {
        return res.status(404).json({ message: 'No products found' });
      }
  
      // Trả về kết quả
      return res.status(200).json({
        data: result.data,
        totalItems: result.totalItems,
        currentPage: page || 1,
        totalPages: limit ? Math.ceil(result.totalItems / limit) : 1,
      });

    } catch (error) {
      console.error('Error fetching products:', error);
      return res.status(500).json({ message: 'Internal Server Error' });

    }
  },

  viewListProduct: async (req, res) => {
    try {

      // Lấy tham số phân trang từ query
      const page = req.query.page ? parseInt(req.query.page) : null;
      let limit = req.query.limit ? parseInt(req.query.limit) : 10;
  
      let offset = 0; // Mặc định offset là 0 nếu không có page
  
      // Nếu cả `page` và `limit` đều tồn tại, tính offset
      if (page && limit) {
        offset = (page - 1) * limit;
      }

  
      // Gọi service lấy sản phẩm
      const result = await productService.viewListProduct({ offset, limit });
  
      // Kiểm tra dữ liệu trả về
      if (!result || result.data.length === 0) {
        return res.status(404).json({ message: 'No products found' });
      }
  
      // Trả về kết quả
      return res.status(200).json({
        data: result.data,
        totalItems: result.totalItems,
        currentPage: page || 1,
        totalPages: limit ? Math.ceil(result.totalItems / limit) : 1,
      });

    } catch (error) {
      console.error('Error fetching products:', error);
      return res.status(500).json({ message: 'Internal Server Error' });

    }
  },
  

  getProductById: async (req, res) => {
    try {
      const id = req.params.id;
      const result = await productService.getProductById(id);

      if (!result) {
        return res.status(404).json({ message: 'Product by id not found' }); // Thông báo lỗi đã sửa
      }

      return res.status(200).json({ message: 'Success', data: result });
    } catch (err) {
      console.error(err); // Log lỗi khi có sự cố
      return res
        .status(500)
        .json({ message: 'Internal Server Error', error: err.message });
    }
  },

  getProductByChildCategory: async (req, res) => {
    try {
        console.log('<< hbbjn >>', );
        // Lấy `childCategoryId` từ params
        const childCategoryId = req.params.childCategoryId;

        // Lấy tham số phân trang từ query
        const page = req.query.page ? parseInt(req.query.page) : null;
        const limit = req.query.limit ? parseInt(req.query.limit) : null;

        let offset = 0; // Mặc định offset là 0 nếu không có page

        // Nếu cả `page` và `limit` tồn tại, tính toán `offset`
        if (page && limit) {
            offset = (page - 1) * limit;
        }

        // Gọi service để lấy danh sách sản phẩm theo `childCategoryId`
        const result = await productService.getProductByChildCategory({
            childCategoryId,
            limit,
            offset,
        });

        // Kiểm tra dữ liệu trả về
        if (!result || result.data.length === 0) {
            return res.status(404).json({
                message: 'No products found for the given child category ID',
            });
        }

        // Trả về kết quả
        return res.status(200).json({
            message: 'Success',
            data: result.data,
            totalItems: result.totalItems,
            currentPage: page || 1,
            totalPages: limit ? Math.ceil(result.totalItems / limit) : 1,
        });
    } catch (err) {
        console.error('Error fetching products by child category:', err);
        return res
            .status(500)
            .json({ message: 'Internal Server Error', error: err.message });
    }
  },


  updatePricesProduct: async (req, res) => {
    try {
      const id = req.params.id;
      const data = req.body;
      const result = await productService.updatePricesProduct(id, data);

      if (!result) {
        return res
          .status(404)
          .json({ message: 'Product not found for update' });
      }

      return res
        .status(200)
        .json({ message: 'Update successful', data: result });
    } catch (err) {
      console.error(err); // Log lỗi để dễ dàng debug
      return res
        .status(500)
        .json({ message: 'Internal Server Error', error: err.message });
    }
  },

  getProductByParentCategory: async (req, res) => {
    try {
        // Lấy `parentCategoryId` từ params
        const parentCategoryId = req.params.parentCategoryId;

        // Lấy tham số phân trang từ query
        const page = req.query.page ? parseInt(req.query.page) : null;
        const limit = req.query.limit ? parseInt(req.query.limit) : null;

        let offset = 0; // Mặc định offset là 0 nếu không có page

        // Nếu cả `page` và `limit` tồn tại, tính toán `offset`
        if (page && limit) {
            offset = (page - 1) * limit;
        }

        // Gọi service để lấy danh sách sản phẩm theo `parentCategoryId`
        const result = await productService.getProductByParentCategory({
            parentCategoryId,
            limit,
            offset,
        });

        // Kiểm tra dữ liệu trả về
        if (!result || result.data.length === 0) {
            return res.status(404).json({
                message: 'No products found for the given parent category ID',
            });
        }

        // Trả về kết quả
        return res.status(200).json({
            message: 'Success',
            data: result.data,
            totalItems: result.totalItems,
            currentPage: page || 1,
            totalPages: limit ? Math.ceil(result.totalItems / limit) : 1,
        });
    } catch (err) {
        console.error('Error fetching products by parent category:', err);
        return res.status(500).json({
            message: 'Internal Server Error',
            error: err.message,
        });
    }
},

  

  updateProduct: async (req, res) => {
    try {
      const id = req.params.id;
      const data = req.body;
      const result = await productService.updateProduct(id, data);

      if (!result) {
        return res
          .status(404)
          .json({ message: 'Product not found for update' });
      }

      return res
        .status(200)
        .json({ message: 'Update successful', data: result });
    } catch (err) {
      console.error(err); // Log lỗi để dễ dàng debug
      return res
        .status(500)
        .json({ message: 'Internal Server Error', error: err.message });
    }
  },

  editProduct: async (req, res) => {
    try {
      const id = req.params.id;
      const {data} = req.body;
      const {images} = req.body;


      await imageService.updateImages(images, id)
      const result = await productService.editProduct(id, data);
      
      return res
        .status(200)
        .json({ message: 'Update successful', data: result });
    } catch (err) {
      console.error(err); // Log lỗi để dễ dàng debug
      return res
        .status(500)
        .json({ message: 'Internal Server Error', error: err.message });
    }
  },


  createProduct: async (req, res) => {
    try {
      const data = req.body;
      const result = await productService.createProduct(data);
      res
        .status(201)
        .json({ message: 'Product created successfully', data: result });
    } catch (err) {
      res
        .status(500)
        .json({ message: 'Internal Server Error', error: err.message });
    }
  },
  deleteProduct: async (req, res) => {
    try {
      const id = req.params.id;
      const result = await productService.deleteProduct(id); // Gọi service để thực hiện xóa mềm

      if (!result) {
        res.status(404).json({ message: 'Product not found' });
      } else {
        res
          .status(200)
          .json({ message: 'Product marked as deleted successfully!' });
      }
    } catch (err) {
      res
        .status(500)
        .json({ message: 'Internal Server Error', error: err.message });
    }
  },

  restoreProduct: async (req, res) => {
    try {
      const id = req.params.id;

      // Gọi service để khôi phục lại
      const result = await productService.restoreProduct(id);

      if (!result) {
        res
          .status(404)
          .json({ message: 'Product not found or already restored' });
      } else {
        res.status(200).json({ message: 'Product restored successfully!' });
      }
    } catch (err) {
      res
        .status(500)
        .json({ message: 'Internal Server Error', error: err.message });
    }
  },

  validateProduct: async (req, res) => {
    const {
      productName,
      productPrice,
      description,
      quantity,
      brand,
      childCategory_id,
      supplier_id,
    } = req.query;

    const errors = validateProductAttributes({
      productName,
      productPrice,
      description,
      quantity,
      brand,
      childCategory_id,
      supplier_id,
    });

    if (Object.keys(errors).length > 0) {
      return res.status(200).json({ errors });
    }

    res.status(200).json({ message: 'Product data is valid.' });
  },
};

module.exports = productController;