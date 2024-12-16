'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Company extends Model {
  }

  Company.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          allowNull: false,
          primaryKey: true,
        },
        name: {
          allowNull: false,
          type: DataTypes.STRING,
        },
        legalName: {
          allowNull: false,
          type: DataTypes.STRING,
        },
        email: {
          allowNull: false,
          type: DataTypes.STRING,
          unique: true,
        },
        phone: {
          allowNull: false,
          type: DataTypes.STRING,
        },
        address: {
          allowNull: true,
          type: DataTypes.STRING,
        },
        website: {
          allowNull: true,
          type: DataTypes.STRING,
        },
        industry: {
          allowNull: true,
          type: DataTypes.STRING,
        },
        clientId: {
          type: DataTypes.UUID,
          allowNull: true,
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
        cupo: {
          type: DataTypes.FLOAT,
          allowNull: false
        }
      },
      {
        sequelize,
        modelName: 'Company',
        tableName: 'Companies',
        timestamps: true,
      }
  );

  return Company;
};

