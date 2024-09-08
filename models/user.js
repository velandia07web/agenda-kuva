'use strict'
const {
  Model
} = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate (models) {
      // define association here
      User.belongsTo(models.Rol, {
        foreignKey: 'idRol',
        as: 'Rol'
      })
    }
  }

  User.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    jwt: {
      allowNull: true,
      type: DataTypes.STRING
    },
    active: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    failedAttempts: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    idRol: {
      type: DataTypes.UUID,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'Users',
    timestamps: true
  })
  return User
}
