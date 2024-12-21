const { DataTypes, Model } = require('sequelize');
const sequelize = require('../configs/db');

const Permission = sequelize.define(
  'Permission',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    action: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,// example : edit , delete , update , read 
    },
  },
  {
    tableName: 'Permission',
    timestamps: false,
  }
);

module.exports = { Permission, sequelize };
