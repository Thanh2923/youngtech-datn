const express = require("express");

const admin = express.Router();

admin.get("/", (req, res) => {
  res.status(200).json({ message: "welcome admin" });
});

module.exports = admin;
