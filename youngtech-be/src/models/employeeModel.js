// models/userModel.js
const { DataTypes } = require('sequelize');
const sequelize = require('../configs/db');

const Employee = sequelize.define(
  'Employee',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    flag: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue : true, 
    }, 
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    profilePicture: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dateOfBirth: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    position: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    account_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Account', // 'Employee' refers to table name
        key: 'id',
      },
    },
  },
  {
    tableName: 'Employee',
    timestamps: false,
  }
);

module.exports = { Employee, sequelize };
