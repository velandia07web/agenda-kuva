'use strict'
const {
  Model
} = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class SocialMedia extends Model {
    static associate (models) {
      // define association here
    }
  }

  SocialMedia.init({
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
    modelName: 'SocialMedia',
    tableName: 'SocialMedias',
    timestamps: true
  })
  return SocialMedia
}
