'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class PassPayment extends Model {
        static associate(models) {
            //PassPayment.belongsTo(models.Pass, {foreignKey: 'idPass',as: 'Pass'});
        }
    }

    PassPayment.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        idPass: {
            type: DataTypes.UUID,
            allowNull: false
        },
        payment: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        file: {
            type: DataTypes.STRING,
            allowNull: false 
        }
    }, {
        sequelize,
        modelName: 'PassPayment',
        tableName: 'PassPayments',
        timestamps: true
    });

    return PassPayment;
};