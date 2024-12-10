'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class QuotationAdd extends Model {
        static associate(models) {
            QuotationAdd.belongsTo(models.Quotation, {
                foreignKey: 'quotationId',
                as: 'quotation',
            });

            QuotationAdd.belongsTo(models.Add, {
                foreignKey: 'addId',
                as: 'add',
            });
        }
    }

    QuotationAdd.init(
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false,
                primaryKey: true,
            },
            quotationId: {
                type: DataTypes.UUID,
                allowNull: false,
            },
            addId: {
                type: DataTypes.UUID,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: 'QuotationAdd',
            tableName: 'QuotationAdd',
            timestamps: true,
        }
    );

    return QuotationAdd;
};
