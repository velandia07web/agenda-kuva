'use strict'
const {
  Model
} = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate (models) {

      Product.belongsTo(models.Zone, {
        foreignKey: 'idZone',
        as: 'Zone'
      })

      Product.hasMany(models.Pack, {
        foreignKey: 'idProduct',
        as: 'Pack'
      })

      Product.hasMany(models.ProductPrice, {
        foreignKey: 'product_id',
        as: 'ProductPrices'
      })
    }
  }

  Product.init({
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
    imagen: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    count: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false
    },
    state:{
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'Product',
    tableName: 'Products',
    timestamps: true
  })
  return Product
}