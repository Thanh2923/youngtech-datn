const imageRepository = require('../repositories/imageRepository');

const imageService = {

  saveImages: async (images, productId) => {
    try {
      // Duyệt qua mảng ảnh và gọi repository để tạo từng ảnh
      const imagePromises = images.map((image) =>
        imageRepository.createImage(image, productId)
      );

      // Chờ tất cả các ảnh được thêm vào
      await Promise.all(imagePromises);
      return { message: 'Images added successfully' };
    } catch (error) {
      console.error('Error in saveImages service:', error);
      throw new Error('Failed to save images');
    }
  },

  updateImages: async (newImages, productId) => {
    try {
      console.log('<< newImages >>', newImages);
      const existingImages = await imageRepository.getAllImagesByProductId(productId);

      const existingUrls = existingImages.map((img) => img.imageUrl);
      const newUrls = newImages.map((img) => img.imageUrl);

      const imagesToDelete = existingImages.filter((img) => !newUrls.includes(img.imageUrl));
      const imagesToAdd = newImages.filter((img) => !existingUrls.includes(img.imageUrl));

      const result = [];

      // Xử lý xóa ảnh không còn trong mảng mới
      for (const img of imagesToDelete) {
        await imageRepository.deleteImage(img.id);
        result.push({ message: `Deleted image: ${img.imageUrl}` });
      }

      // Thêm ảnh mới vào
      for (const img of imagesToAdd) {
        if (img.imageUrl) {
          const savedImage = await imageRepository.createImage(img, productId); // Truyền cả img và productId
          result.push({ message: `Added new image: ${img.imageUrl}`, image: savedImage });
        }
      }

      return result;
    } catch (error) {
      throw new Error('Error updating images: ' + error.message);
    }
  },
};

module.exports = imageService;
