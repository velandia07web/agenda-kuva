'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class EventPack extends Model {
        static associate(models) {
            EventPack.belongsTo(models.Event, {
                foreignKey: 'eventId',
                as: 'Event'
            });

            EventPack.belongsTo(models.Pack, {
                foreignKey: 'packId',
                as: 'Pack'
            });
        }
    }

    EventPack.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        eventId: {
            type: DataTypes.UUID,
            allowNull: false
        },
        packId: {
            type: DataTypes.UUID,
            allowNull: false
        },
        quantityDeadHours: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
    }, {
        sequelize,
        modelName: 'EventPack',
        tableName: 'EventPack',
        timestamps: true
    });

    return EventPack;
};