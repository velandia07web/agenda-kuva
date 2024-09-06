'use strict'
const {
  Model
} = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class TypeClient extends Model {
    static associate (models) {
      // define association here
    }
  }
  TypeClient.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, // Genera UUID automáticamente
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
    modelName: 'TypeClient',
    tableName: 'TypeClients',
    timestamps: true
  })
  return TypeClient
}
