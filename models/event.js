'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Event extends Model {
        static associate(models) {
            Event.belongsTo(models.Quotation, {
                foreignKey: 'quotationId',
                as: 'Quotation'
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
        }
    }, {
        sequelize,
        modelName: 'Event',
        tableName: 'Events',
        timestamps: true
    });

    return Event;
};