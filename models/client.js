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

      Client.belongsTo(models.TypeClient, {
        foreignKey: 'idTypeClient',
        as: 'TypeClient'
      })

      Client.belongsTo(models.SocialMedia, {
        foreignKey: 'idSocialMedia',
        as: 'SocialMedia'
      })

      Client.belongsTo(models.Company, {
        foreignKey: 'idCompany',
        as: 'associatedCompany'
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
    email: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true
    },
    idCompany: {
      type: DataTypes.UUID,
      allowNull: true,
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
    state:{
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'Client',
    tableName: 'Clients',
    timestamps: true
  })
  return Client
}
