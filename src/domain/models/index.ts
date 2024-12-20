import UserModel from './user.model'; // Assurez-vous que le chemin est correct
import dotenv from "dotenv";
import BookingModel from "./booking.model";
import sequelize from "../../config/database";
import {createDb} from "../../../server";
dotenv.config();

const createDatabase = async () => {
    if (process.env.NODE_ENV !== 'development') {
        console.log('Skipping database creation in non-development environment');
        return;
    }

    try {
        // Supprimer les contraintes de clé étrangère
        await sequelize.getQueryInterface().removeConstraint('bookings', 'bookings_ibfk_1');


        await UserModel.sync({force: true});
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
};
