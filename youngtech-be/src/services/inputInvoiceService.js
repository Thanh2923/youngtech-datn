
const productRepository = require('../repositories/productRepository');
const inputInvoiceRepository = require('../repositories/inputInvoiceRepository')
const imageRepository = require('../repositories/imageRepository');

const inputInvoiceService = {
  saveInputInvoice: async (invoiceData) => {
    try {
      const savedInvoice = await inputInvoiceRepository.saveInputInvoice(invoiceData);
      return savedInvoice; 
    } catch (error) {
      throw new Error('Error saving input invoice: ' + error.message);
    }
  },


  addProductToInventory: async (products) => {
    const result = [];
  
    for (const product of products) {
      try {
        const existingProduct = await productRepository.getProductByName(product.productName);
  
        if (existingProduct) {
          // Nếu sản phẩm đã tồn tại, chỉ cập nhật số lượng
          existingProduct.quantity += product.quantity;
          await productRepository.updateProduct(existingProduct.id, { quantity: existingProduct.quantity });
          result.push({ message: `Updated quantity for ${product.productName}`, productId: existingProduct.id });
        } else {
          // Nếu sản phẩm mới, tạo sản phẩm mới
          const newProduct = await productRepository.createProduct(product);
  
          // Thêm ảnh cho sản phẩm mới
          if (product.images && product.images.length > 0) {
            await Promise.all(
              product.images.map(async (imageUrl) => {
                await imageRepository.createImage({ imageUrl }, newProduct.productId);
              })
            );
          }
  
          result.push({ message: `Added new product: ${product.productName}`, productId: newProduct.productId });
        }
      } catch (error) {
        console.error(`Error processing product: ${product.productName}`, error);
        result.push({ message: `Failed to process product: ${product.productName}`, error: error.message });
      }
    }
  
    return result;
  },


  getAllInputInvoice: async (offset, limit) => {
    return await inputInvoiceRepository.getAllInputInvoice({ offset, limit });
  },

};

module.exports = inputInvoiceService;
