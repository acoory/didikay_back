import {DataTypes} from '@sequelize/core';
import sequelize from '../../config/database';
import UserModel from './client.model';
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
    }
});

Booking.belongsTo(UserModel, {foreignKey: 'userId'});
// Booking.belongsTo(ServicesModel, {foreignKey: 'prestationId'});


export default Booking;