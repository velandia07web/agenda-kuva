'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class StateQuotation extends Model {
    static associate (models) {
      // define association here
    }
  }
  StateQuotation.init({
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
    modelName: 'StateQuotation',
    tableName: 'StateQuotations'
  })
  return StateQuotation
}
