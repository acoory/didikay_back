import {DataTypes} from '@sequelize/core';
import sequelize from '../../config/database';
import subprestationModel from "./subprestation.model";

const ServicesModel = sequelize.define('services', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    duration: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM('active', 'inactive'),
        defaultValue: 'active',
        allowNull: false,
    },
    subprestationId: {
        type: DataTypes.INTEGER,
        references: {
            model: subprestationModel,
            key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    }
});

ServicesModel.belongsTo(subprestationModel, {foreignKey: 'subprestationId'});

export default ServicesModel;