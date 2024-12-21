// models/userModel.js
const { DataTypes } = require('sequelize');
const sequelize = require('../configs/db');
const roleAccount = sequelize.define(
  'roleAccount',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    role_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Role', // 'Customer' refers to table name
        key: 'id',
      },
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
    tableName: 'RoleAccount',
    timestamps: false,
  }
);

module.exports = { roleAccount, sequelize };
