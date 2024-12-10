'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class QuotationProduct extends Model {
        static associate(models) {
            QuotationProduct.belongsTo(models.Quotation, {
                foreignKey: 'quotationId',
                as: 'Quotation'
            });

            QuotationProduct.belongsTo(models.Product, {
                foreignKey: 'productId',
                as: 'Product'
            });
        }
    }

    QuotationProduct.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        quotationId: {
            type: DataTypes.UUID,
            allowNull: false
        },
        productId: {
            type: DataTypes.UUID,
            allowNull: false
        },
        cityId: {
            type: DataTypes.UUID,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'QuotationProduct',
        tableName: 'QuotationProduct',
        timestamps: true
    });

    return QuotationProduct;
};
