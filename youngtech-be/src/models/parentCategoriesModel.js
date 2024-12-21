// models/userModel.js
const { DataTypes } = require('sequelize');
const sequelize = require('../configs/db');

const ParentCategories = sequelize.define(
  'ParentCategories',
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
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

  },
  {
    tableName: 'ParentCategories',
    timestamps: false,
  }
);

module.exports = { ParentCategories, sequelize };
