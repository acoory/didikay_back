import { DataTypes } from '@sequelize/core';
import sequelize from '../../config/database';
import subprestationModel from "./subprestation.model";
import {SubprestationModel} from "./index";


const PrestationModel = sequelize.define('prestation', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    timestamps: false,
});

export default PrestationModel;


// exemple prestations :

// [
//     {
//     id: 1,
//     name: 'Départ de locks',
// }, {
//     id: 2,
//     name: 'Coiffure',
//     subprestations: [{
//         id: 1,
//         name: 'Racine',
//         serviceId: 1,
//     },
//         {
//             id: 2,
//             name: 'Coiffure',
//             serviceId: 1,
//         }]
// }]