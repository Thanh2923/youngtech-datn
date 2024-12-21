const { DataTypes } = require('sequelize');
const sequelize = require('../configs/db');

const RefreshToken = sequelize.define(
  'RefreshToken',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    account_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Account', // 'Account' refers to table name
        key: 'id',
      },
    },
    refresh_token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    expires_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    tableName: 'RefreshToken',
    timestamps: false,
    underscored: true,
  }
);

module.exports = { RefreshToken, sequelize };
