import {DataTypes} from '@sequelize/core';
import sequelize from '../../config/database';
import UserModel from './user.model';
import ServicesModel  from "./services.model";
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
    code: {
        type: DataTypes.STRING,
        allowNull: true,
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
    prestationId: {
        type: DataTypes.INTEGER,
        references: {
            model: ServicesModel,
            key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    },
});

Booking.belongsTo(UserModel, {foreignKey: 'userId'});
Booking.belongsTo(ServicesModel, {foreignKey: 'prestationId'});


export default Booking;