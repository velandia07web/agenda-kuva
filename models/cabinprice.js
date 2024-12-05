'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class CabinPrice extends Model {
        static associate(models) {
            CabinPrice.belongsTo(models.Cabin, {
                foreignKey: 'idCabin',
                as: 'Cabin'
            });
        }
    }
    CabinPrice.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        idCabin: {
            type: DataTypes.UUID,
            allowNull: false
        },
        typeEvent: {
            type: DataTypes.ENUM('social', 'business'),
            allowNull: false
        },
        pricePerHour: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        priceInit: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        deadHourPrice: {
            type: DataTypes.FLOAT,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'CabinPrice',
        tableName: 'CabinPrices',
        timestamps: true
    });
    return CabinPrice;
};
