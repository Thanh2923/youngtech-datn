// models/userModel.js
const { DataTypes } = require('sequelize');
const sequelize = require('../configs/db');

const Account = sequelize.define(
  'Account',
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
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    otp : { 
      type : DataTypes.STRING(6),
      allowNull : true,
    },
    otpExpires : {
      type : DataTypes.DATE,
      allowNull: true,
    }
  },
  {
    tableName: 'Account',
    timestamps: false,
  }
);

module.exports = { Account, sequelize };
