'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Client extends Model {
    static associate (models) {
      Client.belongsTo(models.User, {
        foreignKey: 'idUser',
        as: 'User'
      })

      Client.belongsTo(models.User, {
        foreignKey: 'idTypeClient',
        as: 'TypeClient'
      })

      Client.belongsTo(models.User, {
        foreignKey: 'idTypeDocument',
        as: 'TypeDocument'
      })

      Client.belongsTo(models.User, {
        foreignKey: 'idSocialMedia',
        as: 'SocialMedia'
      })

      Client.hasOne(models.Company, {
        foreignKey: 'clientId',
        as: 'associatedCompany',
      });
    }
  }
  Client.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING
    },
    lastName: {
      allowNull: false,
      type: DataTypes.STRING
    },
    CC: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true
    },
    idTypeClient: {
      type: DataTypes.UUID,
      allowNull: false
    },
    idTypeDocument: {
      type: DataTypes.UUID,
      allowNull: false
    },
    numberDocument: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true
    },
    company: {
      allowNull: true,
      type: DataTypes.STRING
    },
    celphone: {
      allowNull: false,
      type: DataTypes.STRING
    },
    charge: {
      allowNull: false,
      type: DataTypes.STRING
    },
    idUser: {
      type: DataTypes.UUID,
      allowNull: false
    },
    idSocialMedia: {
      type: DataTypes.UUID,
      allowNull: false
    },
    cupoDisponible: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    cupoCopado: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'Client',
    tableName: 'Clients',
    timestamps: true
  })
  return Client
}
