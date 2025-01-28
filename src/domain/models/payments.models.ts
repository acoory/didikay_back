import { DataTypes } from '@sequelize/core';
import sequelize from '../../config/database';
import {ClientModel} from "./index";

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
        references: {
            model: ClientModel,
            key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
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

