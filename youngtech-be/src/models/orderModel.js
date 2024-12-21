// models/userModel.js
const { DataTypes } = require('sequelize');
const sequelize = require('../configs/db');

const Order = sequelize.define(
  'Order',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    flag: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    orderDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },

    successDate: {
      type: DataTypes.DATE,
 
      allowNull: false,
      defaultValue: DataTypes.NOW,
 
      allowNull: true,
 
    },

    totalAmount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'Pending',
    },
    paymentMethod: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'Cash', 
    },
  },
  {
    tableName: 'Order',
    timestamps: false,
  }
);

module.exports = { Order, sequelize };