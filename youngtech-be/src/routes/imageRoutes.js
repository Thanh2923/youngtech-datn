const express = require("express");
const imageRoutes = express.Router();
const imageController = require("../controllers/imageController");

imageRoutes.get("/", imageController.getAllImage);

imageRoutes.get("/:id", imageController.getImageById);

imageRoutes.post("/", imageController.createImage);

imageRoutes.put("/:id", imageController.updateImage);

imageRoutes.delete("/:id", imageController.deleteImage);

imageRoutes.put("/:id/restore", imageController.restoreImage);

imageRoutes.get("/product/:productId", imageController.getImageByProductId);

module.exports = imageRoutes;
