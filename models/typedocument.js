'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class TypeDocument extends Model {
    static associate (models) {
      TypeDocument.hasMany(models.Client, {
        foreignKey: 'idTypeDocument',
        as: 'client'
      })
    }
  }
  TypeDocument.init({
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
    modelName: 'TypeDocument',
    tableName: 'TypeDocuments',
    timestamps: true
  })
  return TypeDocument
}
