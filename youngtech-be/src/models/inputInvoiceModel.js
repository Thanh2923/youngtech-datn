
// models/userModel.js
const { DataTypes } = require("sequelize");
const sequelize = require("../configs/db");

const InputInvoice = sequelize.define(
  "InputInvoice",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    invoiceDate: {
      type: DataTypes.DATE,
      allowNull: false
    },

    totalAmount: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    linkPdf: {
      type: DataTypes.STRING,
      allowNull: false
    },

    employee_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "Employee", // 'InputInvoice' refers to table name
        key: "id"
      }
    }
  },
  {
    tableName: "InputInvoice",
    timestamps: false
  }
);

module.exports = { InputInvoice, sequelize };
