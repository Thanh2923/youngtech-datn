const { DataTypes } = require('sequelize');
const sequelize = require('../configs/db');

const RolePermission = sequelize.define(
  'RolePermission',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    role_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Role',
        id: 'id',
      },
    },
    permission_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Permission',
        id: 'id',
      },
      module : {
        type : DataTypes.STRING,
        allowNull : false    
      }
    },
  },
  {
    tableName: 'RolePermission',
    timestamps: false,
  }
);

module.exports = { RolePermission, sequelize };
