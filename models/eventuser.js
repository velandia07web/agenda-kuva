'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class EventUser extends Model {
        static associate(models) {
            EventUser.belongsTo(models.Event, {
                foreignKey: 'eventId',
                as: 'Event'
            });

            EventUser.belongsTo(models.User, {
                foreignKey: 'userId',
                as: 'User'
            });
        }
    }

    EventUser.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        eventId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'Events',
                key: 'id'
            },
            onDelete: 'CASCADE'
        },
        userId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'Users',
                key: 'id'
            },
            onDelete: 'CASCADE'
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'employee',
        }
    }, {
        sequelize,
        modelName: 'EventUser',
        tableName: 'EventUsers',
        timestamps: true
    });

    return EventUser;
};
