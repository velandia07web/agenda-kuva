'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Pack extends Model {
    static associate (models) {
      // define association here
      Pack.belongsTo(models.Product, {
        foreignKey: 'idProduct',
        as: 'Product'
      })
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
    idProduct: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Pack',
    tableName: 'Packs',
    timestamps: true
  })
  return Pack
}
