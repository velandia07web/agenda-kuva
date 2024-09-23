'use strict'
const {
  Model
} = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class SocialMedia extends Model {
    static associate (models) {
      SocialMedia.hasMany(models.Client, {
        foreignKey: 'idSocialMedia',
        as: 'client'
      })
    }
  }

  SocialMedia.init({
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
    modelName: 'SocialMedia',
    tableName: 'SocialMedias',
    timestamps: true
  })
  return SocialMedia
}
