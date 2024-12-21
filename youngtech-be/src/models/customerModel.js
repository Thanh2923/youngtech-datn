// models/userModel.js

const { DataTypes } = require('sequelize');
const sequelize = require('../configs/db');

const Customer = sequelize.define(
  'Customer',
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
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
      defaultValue: '',
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
      defaultValue: '',
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: false,
      defaultValue: '',
    },
    account_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Account', // 'Customer' refers to table name
        key: 'id',
      },
    },
  },
  {
    tableName: 'Customer',
    timestamps: false,
  }
);

module.exports = {Customer, sequelize};
