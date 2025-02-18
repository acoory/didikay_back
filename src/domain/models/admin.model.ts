import {DataTypes} from '@sequelize/core';
import sequelize from '../../config/database';

export type adminType = {
    id?: number;
    firstname: string;
    lastname: string;
    email: string;
    password: string;
}

const AdminModel = sequelize.define('admin', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    firstname: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastname: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

export default AdminModel;