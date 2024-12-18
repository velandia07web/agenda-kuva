'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Pass extends Model {
        static associate(models) {
            //Pass.belongsTo(models.Quotation, {foreignKey: 'quotationId',as: 'Quotation'});
            //Pass.hasMany(models.PassPayment, {foreignKey: 'idPass',as: 'PassPayments'});
        }
    }

    Pass.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        quotationId: {
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