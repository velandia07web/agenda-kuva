'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class PricePack extends Model {
    static associate (models) {
      // define association here
      PricePack.belongsTo(models.Pack, {
        foreignKey: 'idPack',
        as: 'Pack'
      })
    }
  }
  PricePack.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    idPack: {
      type: DataTypes.UUID,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'PricePack',
    tableName: 'PricePacks',
    timestamps: true
  })
  return PricePack
}
