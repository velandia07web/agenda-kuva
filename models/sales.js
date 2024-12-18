'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Sale extends Model {
        static associate(models) {
            Sale.belongsTo(models.Quotation, {
                foreignKey: 'idQuotation',
                as: 'Quotation'
            });
            
            Sale.belongsTo(models.PaymentsDate, {
                foreignKey: 'idPaymentsDate',
                as: 'PaymentsDate'
            });

            Sale.belongsTo(models.Pass, {
                foreignKey: 'idPass',
                as: 'Pass'
            });

            Sale.belongsTo(models.Invoice, {
                foreignKey: 'idInvoice',
                as: 'Invoice'
            });
        }
    }

    Sale.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        idQuotation: {
            type: DataTypes.UUID,
            allowNull: false
        },
        idPaymentsDate: {
            type: DataTypes.UUID,
            allowNull: true
        },
        arrearsDays: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        timelyPaymentDate: {
            type: DataTypes.DATE,
            allowNull: true
        },
        idPass: {
            type: DataTypes.UUID,
            allowNull: true
        },
        pendingPayment: {
            type: DataTypes.FLOAT,
            allowNull: true
        },
        idInvoice: {
            type: DataTypes.UUID,
            allowNull: true
        },
        dateInvoice: {
            type: DataTypes.DATE,
            allowNull: true
        },
        state: {
            type: DataTypes.STRING,
            allowNull: true
        },
        etapa: {
            type: DataTypes.STRING,
            allowNull: true
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        }
    }, {
        sequelize,
        modelName: 'Sale',
        tableName: 'Sales',
        timestamps: true
    });

    return Sale;
};