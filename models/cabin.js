'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Cabin extends Model {
        static associate(models) {
            Cabin.belongsTo(models.Zone, {
                foreignKey: 'idZone',
                as: 'Zone'
            });
            Cabin.hasMany(models.CabinPrice, {
                foreignKey: 'idCabin',
                as: 'Prices'
            });
        }
    }
    Cabin.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        idZone: {
            type: DataTypes.UUID,
            allowNull: false
        },
        active: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        }
    }, {
        sequelize,
        modelName: 'Cabin',
        tableName: 'Cabins',
        timestamps: true
    });
    return Cabin;
};