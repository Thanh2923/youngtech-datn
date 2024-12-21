
// models/userModel.js
const { DataTypes } = require('sequelize');
const sequelize = require('../configs/db');

const Role = sequelize.define(
  'Role',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    roleName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    tableName: 'Role',
    timestamps: false,
  }
);

module.exports = { Role, sequelize };
