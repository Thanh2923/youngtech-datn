// models/userModel.js
const { DataTypes } = require('sequelize');
const sequelize = require('../configs/db');

const Supplier = sequelize.define(
  'Supplier',
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
    supplierName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contactName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },

  },
  {
    tableName: 'Supplier',
    timestamps: false,
  }
);

module.exports = { Supplier, sequelize };
