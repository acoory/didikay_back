import {DataTypes} from '@sequelize/core';
import sequelize from '../../config/database';
import UserModel from './user.model';

const Booking = sequelize.define('booking', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    dateTimeStart: {
        type: DataTypes.DATE, // Début du rendez-vous
        allowNull: false,
    },
    dateTimeEnd: {
        type: DataTypes.DATE, // Fin du rendez-vous
        allowNull: false,
    },
    location: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    status: {
        type: DataTypes.ENUM('pending', 'confirmed', 'cancelled'),
        defaultValue: 'pending',
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
});


export default Booking;