import {DataTypes} from '@sequelize/core';
import sequelize from '../../config/database';
// import { PrestationModel } from './index';
import ServiceModel from './services.model';
import prestationModel from "./prestation.model";


const SubprestationModel = sequelize.define('subprestation', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    prestation_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    timestamps: false,
});

export default SubprestationModel;