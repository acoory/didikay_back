import ClientModel from './client.model'; // Assurez-vous que le chemin est correct
import dotenv from "dotenv";
import BookingModel from "./booking.model";
import sequelize from "../../config/database";
import {createDb} from "../../../server";
import ServicesModel from "./services.model";
import PrestationModel from "./prestation.model";
import SubprestationModel from "./subprestation.model";
import prestationModel from "./prestation.model";
import BusyDayModel from "./busyDay.model";
import bookingModel from "./booking.model";
import PaymentModel from "./payments.models";
import daysOfWeekModel from "./daysOfWeek.model";
import adminModel from "./admin.model";
dotenv.config();

const createDatabase = async () => {
    if (process.env.NODE_ENV !== 'development') {
        console.log('Skipping database creation in non-development environment');
        return;
    }

    try {

        await PrestationModel.sync({force: true});
        await SubprestationModel.sync({force: true});
        await ServicesModel.sync({force: true});
        await BusyDayModel.sync({force: true});
        await ClientModel.sync({force: true});
        await PaymentModel.sync({force: true});
        await bookingModel.sync({force: true});
        await adminModel.sync({force: true});
        // await ReservationModel.sync({force: true});

        await daysOfWeekModel.sync({force: true});

        ClientModel.hasMany(PaymentModel, {
            foreignKey: 'clientId',
            as: 'payments',
        });

        PaymentModel.belongsTo(ClientModel, {
            foreignKey: 'clientId',
            as: 'client',
        });

        PrestationModel.hasMany(SubprestationModel, {
            foreignKey: 'prestation_id',
            as: 'subprestations',
        });

        SubprestationModel.belongsTo(PrestationModel, {
            foreignKey: 'prestation_id',
            as: 'prestation',
        });

        SubprestationModel.hasMany(ServicesModel, {
            foreignKey: 'subprestation_id',
            as: 'services',
        });

        ServicesModel.belongsTo(SubprestationModel, {
            foreignKey: 'subprestation_id',
            as: 'subprestation',
        });



        console.log("Database created!");
    } catch (error) {
        console.error('Error synchronizing database:', error);
    }
};


export  {
    createDatabase,
    // UserModel,
    ClientModel,
    BusyDayModel,
    BookingModel,
    SubprestationModel,
    ServicesModel,
    PrestationModel,
    daysOfWeekModel,
};
