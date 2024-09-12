'use strict'
const {
  Model
} = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class TypePrice extends Model {
    static associate (models) {
      TypePrice.hasMany(models.Add, {
        foreignKey: 'idTypePrice',
        as: 'Add'
      })
    }
  }
  TypePrice.init({
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
    modelName: 'TypePrice',
    tableName: 'TypePrices',
    timestamps: true
  })
  return TypePrice
}
