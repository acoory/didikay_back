import { DataTypes } from '@sequelize/core';
import sequelize from '../../config/database';

const PaymentModel = sequelize.define('payment', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
        amount: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        deposit: {
            type: DataTypes.FLOAT,
            allowNull: false,
            defaultValue: 0,
        },
    clientId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    paymentIntent: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    timestamps: false,
}
);

export default PaymentModel;

