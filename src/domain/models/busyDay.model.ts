import { DataTypes } from '@sequelize/core';
import sequelize from '../../config/database';


const BusyDayModel = sequelize.define('busy_day', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    start_time: {
        type: DataTypes.DATE,
        allowNull: false, // Le champ start_time est requis
    },
    end_time: {
        type: DataTypes.DATE,
        allowNull: false, // Le champ end_time est requis
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true, // Description est optionnelle
    },
}, {
    timestamps: false, // Pas de champs createdAt/updatedAt
});

export default BusyDayModel;
