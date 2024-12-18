'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Pass extends Model {
        static associate(models) {
            //Pass.belongsTo(models.Client, {foreignKey: 'clientId',as: 'Client'});
            //Pass.hasMany(models.PassPayment, {foreignKey: 'idPass',as: 'PassPayments'});
        }
    }

    Pass.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        clientId: {
            type: DataTypes.UUID,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'Pass',
        tableName: 'Passes',
        timestamps: true
    });

    return Pass;
};