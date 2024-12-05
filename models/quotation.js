'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Quotation extends Model {
        static associate(models) {
            Quotation.belongsTo(models.Client, {
                foreignKey: 'clientId',
                as: 'Client'
            });

            Quotation.belongsTo(models.City, {
                foreignKey: 'cityId',
                as: 'City'
            });
        }
    }

    Quotation.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        state: {
            type: DataTypes.STRING,
            allowNull: false
        },
        correlativo: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        reference: {
            type: DataTypes.STRING,
            allowNull: false
        },
        clientId: {
            type: DataTypes.UUID,
            allowNull: false
        },
        eventDate: {
            type: DataTypes.DATE,
            allowNull: false
        },
        cityId: {
            type: DataTypes.UUID,
            allowNull: false
        },
        eventType: {
            type: DataTypes.ENUM('social', 'business'),
            allowNull: false
        },
        subtotal: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        discount: {
            type: DataTypes.FLOAT,
            defaultValue: 0
        },
        IVA: {
            type: DataTypes.FLOAT,
            allowNull: true
        },
        totalNet: {
            type: DataTypes.FLOAT,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'Quotation',
        tableName: 'Quotations',
        timestamps: true
    });

    return Quotation;
};
