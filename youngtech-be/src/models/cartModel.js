
// models/userModel.js
const { DataTypes } = require("sequelize");
const sequelize = require("../configs/db");

const Cart = sequelize.define(
  "Cart",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    customer_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "Customer", // 'Comment' refers to table name
        key: "id"
      }
    }
  },
  {
    tableName: "Cart",
    timestamps: false
  }
);

module.exports = { Cart, sequelize };

