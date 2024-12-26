import UserModel from './user.model'; // Assurez-vous que le chemin est correct
import dotenv from "dotenv";
import BookingModel from "./booking.model";
import sequelize from "../../config/database";
import {createDb} from "../../../server";
import PrestationModel from "./prestation.model";
dotenv.config();

const createDatabase = async () => {
    if (process.env.NODE_ENV !== 'development') {
        console.log('Skipping database creation in non-development environment');
        return;
    }

    try {
        //
        await sequelize.query('SET foreign_key_checks = 0;');
        await sequelize.getQueryInterface().dropAllTables();
        // await sequelize.getQueryInterface().removeConstraint('bookings', 'bookings_ibfk_1');
        // await sequelize.getQueryInterface().removeConstraint('bookings', 'bookings_ibfk_2');


        await UserModel.sync({force: true});
        await PrestationModel.sync({force: true});
        await BookingModel.sync({force: true});
        console.log("Database created!");
    } catch (error) {
        console.error('Error synchronizing database:', error);
    }
};

export const models = {
    createDatabase,
    User: UserModel,
    Booking: BookingModel,
    Prestation: PrestationModel,
};
