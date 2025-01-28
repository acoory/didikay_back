import {DataTypes} from '@sequelize/core';
import sequelize from '../../config/database';
import UserModel from './client.model';
import ServicesModel  from "./services.model";
import paymentsModels from "./payments.models";

const Booking = sequelize.define('booking', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    dateTimeStart: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    dateTimeEnd: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    code: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: UserModel,
            key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    },
    data: {
        type: DataTypes.JSON,
        allowNull: false,
    },
    paymentId: {  // Ajout de la relation avec le paiement
        type: DataTypes.INTEGER,
        references: {
            model: paymentsModels, // Le modèle PaymentModel est maintenant lié
            key: 'id',
        },
        onDelete: 'SET NULL',  // Vous pouvez ajuster cette contrainte selon vos besoins
        onUpdate: 'CASCADE',
    }
});

Booking.belongsTo(UserModel, {foreignKey: 'userId'});
Booking.belongsTo(paymentsModels, { foreignKey: 'paymentId' });

export default Booking;