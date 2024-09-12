'use strict'
const {
  Model
} = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Add extends Model {
    static associate (models) {
      Add.belongsTo(models.TypePrice, {
        foreignKey: 'idTypePrice',
        as: 'typePrice'
      })
    }
  }
  Add.init({
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
    price: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    idTypePrice: {
      type: DataTypes.UUID,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Add',
    tableName: 'Adds',
    timestamps: true
  })
  return Add
}
