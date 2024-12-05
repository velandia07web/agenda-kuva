'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class QuotationPack extends Model {
        static associate(models) {
            QuotationPack.belongsTo(models.Quotation, {
                foreignKey: 'quotationId',
                as: 'Quotation'
            });

            QuotationPack.belongsTo(models.Pack, {
                foreignKey: 'packId',
                as: 'Pack'
            });
        }
    }

    QuotationPack.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        quotationId: {
            type: DataTypes.UUID,
            allowNull: false
        },
        packId: {
            type: DataTypes.UUID,
            allowNull: false
        },
        cityId: {
            type: DataTypes.UUID,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'QuotationPack',
        tableName: 'QuotationPack',
        timestamps: true
    });

    return QuotationPack;
};
