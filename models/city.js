'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class City extends Model {
    static associate (models) {
      City.belongsTo(models.Zone, {
        foreignKey: 'idZone',
        as: 'zone'
      })
    }
  }

  City.init({
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
    },
    idZone: {
      type: DataTypes.UUID,
      allowNull: false
    },
    transportPrice: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: 0
    }
  }, {
    sequelize,
    modelName: 'City',
    tableName: 'Cities',
    timestamps: true
  })

  return City
}
