'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Zone extends Model {
    static associate (models) {
      Zone.hasMany(models.City, {
        foreignKey: 'idZone',
        as: 'cities'
      })

      Zone.hasMany(models.User, {
        foreignKey: 'idZone',
        as: 'User'
      })

      Zone.hasMany(models.Product, {
        foreignKey: 'idZone',
        as: 'Product'
      })

      Zone.hasMany(models.Pack, {
        foreignKey: 'idZone',
        as: 'Pack'
      })
    }
  }
  Zone.init({
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
    modelName: 'Zone',
    tableName: 'Zones',
    timestamps: true
  })
  return Zone
}
