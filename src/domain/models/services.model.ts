import {DataTypes} from '@sequelize/core';
import sequelize from '../../config/database';
import subprestationModel from "./subprestation.model";
import prestationModel from "./prestation.model";

const ServiceModel = sequelize.define('service', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    duration_minutes: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    subprestation_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    timestamps: false,
});

export default ServiceModel;

// exemple