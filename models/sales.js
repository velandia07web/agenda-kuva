'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Sale extends Model {
        static associate(models) {
            Sale.belongsTo(models.Quotation, {
                foreignKey: 'quotationId',
                as: 'Quotation'
            });
        }
    }

    Sale.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        quotationId: {
            type: DataTypes.UUID,
            allowNull: false
        },
        subtotal: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        totalWithIVA: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        IVA: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        totalNet: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        shippingCost: {
            type: DataTypes.FLOAT,
            allowNull: true
        },
        paymentMethod: {
            type: DataTypes.STRING,
            allowNull: false
        },
        paymentTerm: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        debt: {
            type: DataTypes.FLOAT,
            allowNull: true
        },
        daysLate: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        paymentMade: {
            type: DataTypes.FLOAT,
            allowNull: true
        },
        bankAccountId: {
            type: DataTypes.UUID,
            allowNull: true
        },
        purchaseOrder: {
            type: DataTypes.STRING,
            allowNull: true
        },
        invoiceNumber: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        state: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'Sale',
        tableName: 'Sales',
        timestamps: true
    });

    return Sale;
};