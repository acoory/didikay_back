import { Op } from '@sequelize/core';
import BookingModel from '../models/booking.model'

/**
 * Récupère les créneaux horaires disponibles pour une date donnée.
 * @param {Date} date - La date pour laquelle créer les créneaux.
 * @returns {Promise<Array<{ dateTimeStart: Date, dateTimeEnd: Date }>>}
 */
export async function getAvailableSlots(date: Date, bookingModel: any) {
    const startHour = 9;
    const endHour = 19;
    const intervalHours = 2;

    const slots = [];
    let currentHour = startHour;

    // Génère tous les créneaux de la journée
    while (currentHour < endHour) {
        const dateTimeStart = new Date(date);
        const dateTimeEnd = new Date(date);

        dateTimeStart.setHours(currentHour, 0, 0, 0);
        dateTimeEnd.setHours(currentHour + intervalHours, 0, 0, 0);

        slots.push({ dateTimeStart, dateTimeEnd });

        currentHour += intervalHours;
    }

    // Récupère les créneaux déjà réservés dans la table Booking
    const bookedSlots = await BookingModel.findAll({
        where: {
            dateTimeStart: {
                [Op.gte]: new Date(date.setHours(0, 0, 0, 0)), // Début de la journée
            },
            dateTimeEnd: {
                [Op.lt]: new Date(date.setHours(23, 59, 59, 999)), // Fin de la journée
            },
        },
        attributes: ['dateTimeStart', 'dateTimeEnd'],
    });

    // Filtre les créneaux réservés
    const availableSlots = slots.filter((slot) => {
        return !bookedSlots.some(
            (booked:any) =>
                slot.dateTimeStart.getTime() === new Date(booked.dateTimeStart).getTime() &&
                slot.dateTimeEnd.getTime() === new Date(booked.dateTimeEnd).getTime()
        );
    });

    return availableSlots;
}

export default getAvailableSlots;