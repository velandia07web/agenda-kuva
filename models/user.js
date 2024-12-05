'use strict'
const {
  Model
} = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate (models) {
      User.belongsTo(models.Rol, {
        foreignKey: 'idRol',
        as: 'Rol'
      })

      User.belongsTo(models.Zone, {
        foreignKey: 'idZone',
        as: 'Zone'
      })

      User.hasMany(models.Client, {
        foreignKey: 'idUser',
        as: 'client'
      })

      User.belongsTo(models.Company, {
        foreignKey: 'idCompany',
        as: 'company'
      })
    }
  }

  User.init({
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
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    cedula: {
      type: DataTypes.BIGINT,
      allowNull: false,
      unique: true
    },
    phone: {
      type: DataTypes.BIGINT,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    jwt: {
      allowNull: true,
      type: DataTypes.STRING
    },
    active: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    failedAttempts: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    idRol: {
      type: DataTypes.UUID,
      allowNull: false
    },
    idZone: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Zones',
        key: 'id'
      }
    },
    idCompany: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'companies',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'Users',
    timestamps: true
  })
  return User
}
