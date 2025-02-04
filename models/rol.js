'use strict'
const {
  Model
} = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Rol extends Model {
    static associate (models) {
      // define association here
      Rol.hasMany(models.User, {
        foreignKey: 'idRol',
        as: 'user'
      })
    }
  }

  Rol.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  }, {
    sequelize,
    modelName: 'Rol',
    tableName: 'Rols',
    timestamps: true
  })

  return Rol
}
