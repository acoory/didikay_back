import {DataTypes} from '@sequelize/core';
import sequelize from '../../config/database';
import { PrestationModel } from './index';

const SubprestationModel = sequelize.define('subprestation', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    prestationId: {
        type: DataTypes.INTEGER,
        references: {
            model: PrestationModel,
            key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    },
},{
    timestamps: false
});



export default SubprestationModel;