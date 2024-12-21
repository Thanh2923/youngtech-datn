
// models/userModel.js
const { DataTypes } = require("sequelize");
const sequelize = require("../configs/db");

const Comment = sequelize.define(
  "Comment",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false
    },

    createAt: {
      type: DataTypes.DATE,
      allowNull: false,
      unique: true
    },
    customer_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "Customer", // 'Comment' refers to table name
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
    tableName: "Comment",
    timestamps: false
  }
);

module.exports = { Comment, sequelize };
