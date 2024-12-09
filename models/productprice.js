'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class ProductPrice extends Model {
        static associate(models) {
            ProductPrice.belongsTo(models.Product, {
                foreignKey: 'product_id',
                as: 'Product',
            });

            ProductPrice.belongsTo(models.Zone, {
                foreignKey: 'idZone',
                as: 'Zone',
            });
        }
    }

    ProductPrice.init(
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false,
                primaryKey: true,
            },
            product_id: {
                type: DataTypes.UUID,
                allowNull: false,
            },
            hour: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            idZone: {
                type: DataTypes.UUID,
                allowNull: false,
            },
            price: {
                type: DataTypes.FLOAT,
                allowNull: false,
            },
            priceDeadHour: {
                type: DataTypes.FLOAT,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: 'ProductPrice',
            tableName: 'ProductPrices',
            timestamps: true,
        }
    );

    return ProductPrice;
};
