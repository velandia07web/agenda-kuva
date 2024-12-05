'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class CabinReservation extends Model {
        static associate(models) {
            CabinReservation.belongsTo(models.Cabin, {
                foreignKey: 'idCabin',
                as: 'Cabin'
            });
        }
    }
    CabinReservation.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        idCabin: {
            type: DataTypes.UUID,
            allowNull: false
        },
        startDate: {
            type: DataTypes.DATE,
            allowNull: false
        },
        endDate: {
            type: DataTypes.DATE,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'CabinReservation',
        tableName: 'CabinReservations',
        timestamps: true
    });
    return CabinReservation;
};