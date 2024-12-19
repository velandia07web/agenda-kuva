'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Event extends Model {
        static associate(models) {
            Event.belongsTo(models.Quotation, {
                foreignKey: 'quotationId',
                as: 'Quotation'
            });
            
            Event.belongsTo(models.User, {
                foreignKey: 'coordinatorId',
                as: 'Coordinator'
            });

            Event.belongsTo(models.User, {
                foreignKey: 'designerId',
                as: 'Designer'
            });

            Event.belongsTo(models.User, {
                foreignKey: 'logisticId',
                as: 'Logistic'
            });

            Event.hasMany(models.EventAdd, {
                foreignKey: 'eventId',
                as: 'EventAdd'
            });

            Event.hasMany(models.EventPack, {
                foreignKey: 'eventId',
                as: 'EventPack'
            });

            Event.hasMany(models.EventProduct, {
                foreignKey: 'eventId',
                as: 'EventProduct'
            });
        }
    }

    Event.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        cityId: {
            type: DataTypes.UUID,
            allowNull: false
        },
        dateStart: {
            type: DataTypes.DATE,
            allowNull: false
        },
        dateEnd: {
            type: DataTypes.DATE,
            allowNull: false
        },
        total: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        quotationId: {
            type: DataTypes.UUID,
            allowNull: false
        },
        days: {
            allowNull: false,
            type: DataTypes.INTEGER
        },
        transportPrice: {
            allowNull: false,
            type: DataTypes.INTEGER
        },
        status: {
            type: DataTypes.STRING,
            allowNull: true
        },
        coordinatorId: {
            type: DataTypes.UUID,
            allowNull: true
        },
        designerId: {
            type: DataTypes.UUID,
            allowNull: true
        },
        logisticId: {
            type: DataTypes.UUID,
            allowNull: true
        },
        personName: {
            type: DataTypes.STRING,
            allowNull: true
        },
        personPhone: {
            type: DataTypes.STRING,
            allowNull: true
        },
        eventImage: {
            type: DataTypes.STRING,
            allowNull: true
        },
        eventDescription: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        location: {
            type: DataTypes.STRING,
            allowNull: true
        }
    }, {
        sequelize,
        modelName: 'Event',
        tableName: 'Events',
        timestamps: true
    });

    return Event;
};