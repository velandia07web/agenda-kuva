'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class QuotationCabin extends Model {
        static associate(models) {
            QuotationCabin.belongsTo(models.Quotation, {
                foreignKey: 'quotationId',
                as: 'Quotation'
            });

            QuotationCabin.belongsTo(models.Cabin, {
                foreignKey: 'cabinId',
                as: 'Cabin'
            });

            QuotationCabin.belongsTo(models.City, {
                foreignKey: 'cityId',
                as: 'City'
            });
        }
    }

    QuotationCabin.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        quotationId: {
            type: DataTypes.UUID,
            allowNull: false
        },
        cabinId: {
            type: DataTypes.UUID,
            allowNull: false
        },
        hours: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        cityId: {
            type: DataTypes.UUID,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'QuotationCabin',
        tableName: 'QuotationCabin',
        timestamps: true
    });

    return QuotationCabin;
};
