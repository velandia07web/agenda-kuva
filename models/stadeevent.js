'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class StadeEvent extends Model {
    static associate (models) {
      // define association here
    }
  }
  StadeEvent.init({
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
    modelName: 'StadeEvent',
    tableName: 'StadeEvents',
    timestamps: true
  })
  return StadeEvent
}
