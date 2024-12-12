'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Quotation extends Model {
        static associate(models) {
            Quotation.hasMany(models.Event, {
                foreignKey: 'quotationId',
                as: 'Events'
            });

            Quotation.belongsTo(models.Client, {
                foreignKey: 'clientId',
                as: 'Client'
            });
        }
    }

    Quotation.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        reference: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        clientId: {
            type: DataTypes.UUID,
            allowNull: false
        },
        typePricesId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        telephone: {
            type: DataTypes.STRING,
            allowNull: false
        },
        SocialMediasId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        userId: {
            type: DataTypes.INTEGER,
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
            allowNull: false
        },
        totalNet: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        state: {
            type: DataTypes.STRING,
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