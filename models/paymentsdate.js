const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class PaymentsDate extends Model {
    }

    PaymentsDate.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        numberDays: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'PaymentsDate',
        tableName: 'PaymentsDates',
        timestamps: true
    });

    return PaymentsDate;
};
