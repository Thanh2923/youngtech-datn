const imageRepository = require('../repositories/imageRepository');
const imageService = require('../services/imageService');

const imageController = {
  create: async (req, res) => {
    const { images, productId } = req.body;

    if (!images || !productId) {
      return res.status(400).json({
        message: 'Images and productId are required',
      });
    }

    try {
      const result = await imageService.saveImages(images, productId);
      return res.status(200).json({
        message: 'Images created successfully',
        data: result,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: 'Internal Server Error',
        error: error.message,
      });
    }
  },

  updateImages: async (req, res) => {
    const { images, productId } = req.body;

    if (!images || !productId) {
      return res.status(400).json({
        message: 'Images and productId are required',
      });
    }

    try {
      const result = await imageService.updateImages(images, productId);
      return res.status(200).json({
        message: 'Images updated successfully',
        data: result,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: 'Internal Server Error',
        error: error.message,
      });
    }
  },

  getAllByProductId: async (req, res) => {
    console
    const { productId } = req.params;

    if (!productId) {
      return res.status(400).json({
        message: 'Product ID is required',
      });
    }

    try {
      const images = await imageRepository.getAllImagesByProductId(productId);
      return res.status(200).json({
        message: 'Images retrieved successfully',
        data: images,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: 'Internal Server Error',
        error: error.message,
      });
    }
  },

  getDetailImage: async (req, res) => {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        message: 'Image ID is required',
      });
    }

    try {
      const image = await imageService.getDetailImage(id);
      if (!image) {
        return res.status(404).json({
          message: `Image with ID ${id} not found`,
        });
      }
      return res.status(200).json({
        message: 'Image details retrieved successfully',
        data: image,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: 'Internal Server Error',
        error: error.message,
      });
    }
  },
};

module.exports = imageController; // Ensure the export is correct
