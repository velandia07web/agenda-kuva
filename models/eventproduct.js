'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class EventProduct extends Model {
        static associate(models) {
            EventProduct.belongsTo(models.Event, {
                foreignKey: 'eventId',
                as: 'Event'
            });

            EventProduct.belongsTo(models.Product, {
                foreignKey: 'productId',
                as: 'Product'
            });
        }
    }

    EventProduct.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        eventId: {
            type: DataTypes.UUID,
            allowNull: false
        },
        productId: {
            type: DataTypes.UUID,
            allowNull: false
        },
        hours: {
            type: DataTypes.STRING,
            allowNull: false
        },
        days: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'EventProduct',
        tableName: 'EventProduct',
        timestamps: true
    });

    return EventProduct;
};
