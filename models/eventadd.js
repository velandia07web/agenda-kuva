'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class EventAdd extends Model {
        static associate(models) {
            EventAdd.belongsTo(models.Event, {
                foreignKey: 'eventId',
                as: 'event',
            });

            EventAdd.belongsTo(models.Add, {
                foreignKey: 'addId',
                as: 'add',
            });
        }
    }

    EventAdd.init(
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false,
                primaryKey: true,
            },
            eventId: {
                type: DataTypes.UUID,
                allowNull: false,
            },
            addId: {
                type: DataTypes.UUID,
                allowNull: false,
            },
            quantity: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: 'EventAdd',
            tableName: 'EventAdd',
            timestamps: true,
        }
    );

    return EventAdd;
};