const sequelize = require('../configs/db');
const imageRepository = {
  createImage: async (image, productId) => {
    try {
      const query = `
        INSERT INTO Image (imageUrl, product_id, flag)
        VALUES (:imageUrl, :productId, true)
      `;
  
      await sequelize.query(query, {
        replacements: {
          imageUrl: image.imageUrl,
          productId, // Truyền đúng giá trị `productId`
        },
      });
  
      return { message: 'Image added successfully' };
    } catch (error) {
      console.error('Error creating image:', error);
      throw error;
    }
  },
  
  getAllImagesByProductId: async (productId) => {
    const query = `SELECT * FROM Image WHERE product_id = :productId`;
    const [result] = await sequelize.query(query, {
      replacements: { productId },
    });
    return result;
  },

  deleteImage: async (id) => {
    const query = `DELETE FROM Image WHERE id = :id`;
    const [result] = await sequelize.query(query, {
      replacements: { id },
    });
    return result;
  },

  getDetailImage: async (id) => {
    const query = `SELECT * FROM Image WHERE id = :id`;
    const [result] = await sequelize.query(query, {
      replacements: { id },
    });
    return result[0] || null;
  },

  updateImage: async (id, imageUrl) => {
    const query = `UPDATE Image SET imageUrl = :imageUrl WHERE id = :id`;
    const [result] = await sequelize.query(query, {
      replacements: { id, imageUrl },
    });
    return result;
  },
};

module.exports = imageRepository;
