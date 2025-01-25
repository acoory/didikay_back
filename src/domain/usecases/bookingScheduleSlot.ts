import moment from 'moment-timezone';
import bookingRepository from "../repositories/bookingRepository";
import bookingModel from "../models/booking.model";
import {Op} from "@sequelize/core";

const createSchedule = (startSchedule: number, endSchedule:number, date: number) => {
    let schedule = [];

    let baseDate = moment.tz(moment.unix(date), "Europe/Paris");

    let start = baseDate.clone().set("hour", startSchedule).set("minute", 0).set("second", 0).set("millisecond", 0);
    let end = baseDate.clone().set("hour", endSchedule).set("minute", 0).set("second", 0).set("millisecond", 0);

    console.log("Horaire ( début, fin )", {
        start: start.format("YYYY-MM-DD HH:mm:ss"),
        start_unix: start.unix(),
        end: end.format("YYYY-MM-DD HH:mm:ss"),
        end_unix: end.unix(),
    });

    // création de l'interval de 30 minutes
    while (start < end) {
        schedule.push({
            start: start.format("YYYY-MM-DD HH:mm:ss"),
              start_unix: start.unix(),
              end: start.clone().add(30, "minutes").format("YYYY-MM-DD HH:mm:ss"),
              end_unix: start.clone().add(30, "minutes").unix(),
            busy: false,
        });
        start.add(30, "minutes");
    }

    return schedule;
};

 const filterScheduleIfBusy = (schedule:any, busy:any, timeBeforeNextPrestation:any,daysOfWeek:any, date:any) => {
    busy.forEach((busyTime:any) => {
        schedule.forEach((time:any) => {
            // Ajouter 30 minutes (en millisecondes)
            const adjustedEndTime = moment(busyTime.dateTimeEnd).add(timeBeforeNextPrestation, "minutes");

            // Vérifier si les horaires de la prestation se chevauchent
            if (moment(time.start).isBetween(busyTime.dateTimeStart, adjustedEndTime, null, "[)") || moment(time.end).isBetween(busyTime.dateTimeStart, adjustedEndTime, null, "[)")) {
                time.busy = true;
            }
        });
    });


    moment.locale("fr");
    const dayNow = moment(date).format("dddd");

    const isClosed = daysOfWeek.some((day:any) => day.day.toLowerCase() === dayNow)

    if (isClosed) {
        schedule.forEach((time:any) => {
            time.busy = true;
        });
    }

    return schedule;
};

 const updateScheduleForPrestationDuration= (schedule:any, prestationDuration:any) => {
    const slotsRequired = prestationDuration; // Durée nécessaire pour la prestation en minutes

    schedule.forEach((slot:any, index:any) => {
        let intervalSlot = 0;

        // Parcourir les créneaux à partir de l'index actuel
        for (let i = index; i < schedule.length; i++) {
            if (!schedule[i].busy) {
                intervalSlot += 30; // Ajouter 30 minutes pour chaque créneau libre
            } else {
                break; // Stopper si un créneau occupé est rencontré
            }

            // Si l'intervalle cumulé dépasse ou atteint la durée requise, on sort de la boucle
            if (intervalSlot >= slotsRequired) {
                break;
            }
        }

        // Si l'intervalle disponible est insuffisant, on marque le créneau comme `busy: true`
        if (intervalSlot < slotsRequired) {
            slot.busy = true;
        }
    });

    console.log("schedule", schedule);



    return schedule;
}


const verifyIfSlotIsAvailable:any = async (start: number, end:number): Promise<boolean> => {
    const bookings = await bookingModel.findAll({
        where: {
            dateTimeStart: {
                [Op.gte]: start,
                [Op.lt]: end,
            },
        },
    });

    return bookings.length === 0;
}

export { createSchedule, filterScheduleIfBusy, updateScheduleForPrestationDuration, verifyIfSlotIsAvailable };
