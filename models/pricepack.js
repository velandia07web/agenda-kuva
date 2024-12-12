'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class PricePack extends Model {
        static associate(models) {
            PricePack.belongsTo(models.Pack, {
                foreignKey: 'idPack',
                as: 'Pack'
            });

            PricePack.belongsTo(models.Product, {
                foreignKey: 'idProduct',
                as: 'Product'
            });
        }
    }

    PricePack.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        idPack: {
            type: DataTypes.UUID,
            allowNull: false
        },
        idProduct: {
            type: DataTypes.UUID,
            allowNull: true
        },
        priceDeadHour: {
            type: DataTypes.FLOAT,
            allowNull: false,
            defaultValue: 0
        }
    }, {
        sequelize,
        modelName: 'PricePack',
        tableName: 'PricePacks',
        timestamps: true
    });

    return PricePack;
};
