'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Pack extends Model {
    static associate (models) {
      Pack.hasMany(models.PricePack, {
        foreignKey: 'idPack',
        as: 'PricePack'
      })

      Pack.belongsTo(models.Zone, {
        foreignKey: 'idZone',
        as: 'Zone'
      })

      Pack.belongsTo(models.Product, {
        foreignKey: 'idProduct',
        as: 'Product'
      });
    }
  }
  Pack.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    idZone: {
      type: DataTypes.UUID,
      allowNull: false
    },
    state:{
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'Pack',
    tableName: 'Packs',
    timestamps: true
  })
  return Pack
}
