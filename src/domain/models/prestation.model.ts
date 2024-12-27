import {DataTypes} from '@sequelize/core';
import sequelize from '../../config/database';
import { SubprestationModel } from './index';

const PrestationModel = sequelize.define('prestation', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    }, {
        timestamps: false
    }
);




export default PrestationModel;