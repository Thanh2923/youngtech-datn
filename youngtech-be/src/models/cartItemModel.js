
// models/userModel.js
const { DataTypes } = require("sequelize");
const sequelize = require("../configs/db");

const CartItem = sequelize.define(
  "CartItem",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    cart_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "Cart",
        key: "id"
      }
    }, 
    product_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "Product", // 'Comment' refers to table name
        key: "id"
      }
    }
  },
  {
    tableName: "CartItem",
    timestamps: false
  }
);

module.exports = { CartItem, sequelize };
