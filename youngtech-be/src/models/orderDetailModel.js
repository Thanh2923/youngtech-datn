
// models/userModel.js
const { DataTypes } = require("sequelize");
const sequelize = require("../configs/db");

const OrderDetail = sequelize.define(
  "OrderDetail",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    unitPrice: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    order_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "Order", 
        key: "id"
      }
    },

    product_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "Product", 
        key: "id"
      }
    }
  },
  {
    tableName: "OrderDetail",
    timestamps: false
  }
);

module.exports = { OrderDetail, sequelize };