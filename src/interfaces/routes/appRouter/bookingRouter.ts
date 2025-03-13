import {Router, Request, Response} from 'express';
import bookingRepository from "../../../domain/repositories/bookingRepository";
import getAvailableSlots from "../../../domain/usecases/getAvailableSlots";
import sequelize from '../../../config/database';
import {ClientModel} from "../../../domain/models";
import ServiceModel from "../../../domain/models/services.model";
import {Op} from "@sequelize/core";
import servicesModel from "../../../domain/models/services.model";
import bookingModel from "../../../domain/models/booking.model";
import { createSchedule, filterScheduleIfBusy, updateScheduleForPrestationDuration } from "../../../domain/usecases/bookingScheduleSlot";
import moment from 'moment';
import DaysOfWeekModel from "../../../domain/models/daysOfWeek.model";
import PaymentModel from "../../../domain/models/payments.models";
import {col} from "sequelize";
import mailService from "../../../infrastructure/mailer/mailService";
import Stripe from "stripe";
import PaymentsModels from "../../../domain/models/payments.models";


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);


const router: Router = Router();
function canAccommodateWithStatus(data:any, nextPrestationDuration:any) {
    const durationInSlots = nextPrestationDuration / 30; // Chaque créneau dure 30 minutes
    const result = data.map((slot:any, index:any) => {
        let isValid = true;

        // Vérifie si les slots suivants permettent d'accueillir la prestation
        for (let j = 0; j < durationInSlots; j++) {
            if (index + j >= data.length || data[index + j].busy) {
                isValid = false;
                break;
            }
        }

        return {
            start: slot.start,
            end: slot.end,
            busy: !isValid, // Si le créneau ne peut pas accueillir, il est "réservé" (busy: true)
        };
    });

    return result;
}



router.post("/", async (req: Request, res: Response) => {

    const { date, nextPrestationDuration } = req.body;

    const startOfDay = moment(date).startOf('day');
    const endOfDay = moment(date).endOf('day');

    // dateOfPrestation in milliseconds
    const dateOfPrestation = date / 1000;

    //log dateOfPrestation to french time
    console.log("Date de la prestation : " , moment.unix(dateOfPrestation).format('YYYY-MM-DD HH:mm:ss'));
    console.log("Temp de la prestation : " , dateOfPrestation);

    const schedule = createSchedule(9, 19, dateOfPrestation);

    const busy = await bookingModel.findAll({
                where: {
                    dateTimeStart: {
                        [Op.gte]: startOfDay,
                        [Op.lt]: endOfDay,
                    },
                },
            })

    // console.log("busy : " , busy);
    const daysOfWeek = await DaysOfWeekModel.findAll(
        {
            where: {
                closed: true,
            }
        }
    );

    const filterBusy = filterScheduleIfBusy(schedule, busy, 30, daysOfWeek, date);

    const finalSchedule = updateScheduleForPrestationDuration(filterBusy, nextPrestationDuration);

    res.status(200).json({ message: "All bookings",
        schedule: finalSchedule,});


    // try {
    //
    //     const startOfDay = moment(date).startOf('day');
    //     const endOfDay = moment(date).endOf('day');
    //
    //     console.log("startOfDay : " , startOfDay);
    //     console.log("endOfDay : " , endOfDay);
    //
    //     // console.log("new Date paris: " , new Date(parisTimestamp).getTime());
    //     // console.log("verify startofDay to timestamp : " , new Date(startOfDay).getTime());
    //
    //     const bookings = await bookingModel.findAll({
    //         where: {
    //             dateTimeStart: {
    //                 [Op.gte]: startOfDay,
    //                 [Op.lt]: endOfDay,
    //             },
    //         },
    //     })
    //
    //     console.log("Booking de la journée : " , bookings);
    //
    //     const formatBusySlotReservation = bookings.map((booking:any) => ({
    //         start: new Date(booking.dateTimeStart).getTime(),
    //         end: new Date(booking.dateTimeEnd).getTime(),
    //     }));
    //
    //     console.log("formatBusySlotReservation : " , formatBusySlotReservation.map((item:any) => ({
    //         start: moment(item.start).format('HH:mm:ss'),
    //         end: moment(item.end).format('HH:mm:ss')
    //     })) );
    //
    //     // console.log("day choice: " , date.split("T")[0]);
    //     const schedule = createSchedule(date, busyDay, formatBusySlotReservation);
    //
    //     // // @ts-ignore
    //     const filterByNextPrestation = canAccommodateWithStatus(schedule, nextPrestationDuration);
    //
    //     res.status(200).json({ message: "All bookings",
    //         schedule: filterByNextPrestation,});
    //
    // } catch (error: any) {
    //     res.status(400).json({
    //         message: error.message
    //     });
    // }
});


// router.post("/create", async (req: Request, res: Response): Promise<any> => {
//     try {
//         const { clientId, services, startTime } = req.body;
//
//         // Validation des paramètres nécessaires
//         if (!clientId || !services || !startTime) {
//             return res.status(400).json({ message: "Les paramètres 'clientId', 'services', et 'startTime' sont requis." });
//         }
//
//         // Vérification que les services existent dans la base de données
//         const serviceIds = services.map((service: any) => service.serviceId);
//         const validServices = await ServicesModel.findAll({
//             where: { id: serviceIds },
//         });
//
//         if (validServices.length !== serviceIds.length) {
//             return res.status(400).json({ message: "Certains services ne sont pas valides." });
//         }
//
//         // Création des réservations
//         const reservations = services.map((serviceData: any) => {
//             const { prestationId, subprestationId, serviceId } = serviceData;
//             const service:any = validServices.find((s: any) => s.id === serviceId);
//
//             if (!service) {
//                 throw new Error(`Service avec l'ID ${serviceId} introuvable`);
//             }
//
//             // Calcul du end_time basé sur la durée du service
//             const startTimeObj = new Date(startTime);
//             const endTime = new Date(startTimeObj.getTime() + service.duration_minutes * 60000);
//
//             // Construction de l'objet JSON pour les prestations
//             const prestationData = {
//                 startTime: startTime,
//                 endTime: endTime,
//                 prestationDetails: services,
//             };
//
//             return {
//                 client_id: clientId,
//                 prestation_id: prestationId,
//                 subprestation_id: subprestationId,
//                 service_id: serviceId,
//                 start_time: startTime,
//                 end_time: endTime,
//                 data: prestationData,  // Ajout du JSON dans le champ 'data'
//                 createdAt: new Date(),
//                 updatedAt: new Date(),
//             };
//         });
//
//         // Bulk insertion des réservations
//         await ClientReservationModel.bulkCreate(reservations);
//
//         // Réponse de succès
//         res.status(201).json({ message: "Réservations créées avec succès.", reservations });
//     } catch (error) {
//         // @ts-ignore
//         console.error('Erreur lors de la création des réservations:', error.message);
//         // @ts-ignore
//         res.status(500).json({ message: error.message });
//     }
// });




router.post("/cancel", async (req: Request, res: Response):Promise<any> => {
    const { bookingId, code } = req.body;

    try {
        const booking = await bookingRepository.cancelBooking(bookingId, code);

        if (!booking) {
            return res.status(404).json({ message: 'Réservation non trouvée.' });
        }

        return res.status(200).json({ message: 'Réservation annulée avec succès.', booking });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erreur interne du serveur.' });
    }
});

router.post("/create", async (req: Request, res: Response): Promise<any> => {

    const { services, client, slot } = req.body;

    try {
        const clientModel :any = await ClientModel.create(client);

        if (!clientModel) {
            return res.status(400).json({ message: 'Impossible de créer le client.' });
        }

        const service:any = await servicesModel.findAll({
            where: { id: services },
        });


        if (service.length !== services.length) {
            return res.status(400).json({ message: "Certains services ne sont pas valides." });
        }

        const totalDurationService = service.filter((item:any) => item.duration_minutes).reduce((acc:any, item:any) => acc + item.duration_minutes, 0);

        // const dateTimeEnd = new Date(slot.end + totalDurationService * 60 * 1000).getTime();
        const dateTimeEnd = moment(slot.end).add(totalDurationService, 'minutes').valueOf();
        const dateTimeStart = moment(slot.start).valueOf();

        console.log("Date start timestamp : " , slot.start);

        // console.log("totalDurationService : " , totalDurationService);
        // console.log("normal Date Time End : " , new Date("2025-01-18T08:00:00"));
        // console.log("Date de début : " , new Date(slot.start).toLocaleTimeString('fr-FR', {
        //     hour: '2-digit',
        //     minute: '2-digit',
        //     second: '2-digit',
        //     timeZone: 'Europe/Paris', // Assure que c'est l'heure française
        // }));
        // console.log("Date de fin + totaldurationService : " , new Date(dateTimeEnd).toLocaleTimeString('fr-FR', {
        //     hour: '2-digit',
        //     minute: '2-digit',
        //     second: '2-digit',
        //     timeZone: 'Europe/Paris', // Assure que c'est l'heure française
        // }));

        console.log("Date de réservation : " , moment(dateTimeStart).format('YYYY-MM-DD HH:mm:ss'));
        console.log("Date de fin de réservation : " , moment(dateTimeEnd).format('YYYY-MM-DD HH:mm:ss'));

        const booking = await bookingModel.create({
            dateTimeStart: dateTimeStart,
            dateTimeEnd: dateTimeEnd,
            userId: clientModel.id,
            data: services,
        })

        return res.status(201).json({ message: 'Réservation créée avec succès.', booking });
    } catch (e:any) {
        console.error(e);
        return res.status(500).json({ message: 'Erreur interne du serveur.', error: e.message });
    }
});

// @ts-ignore
router.get("/reservation/:id", async (req: Request, res: Response) => {
        const { id } = req.params;

        try {
            const booking:any = await bookingModel.findByPk(id);

            if (!booking) {
                return res.status(404).json({ message: 'Réservation non trouvée.' });
            }

            const services = await ServiceModel.findAll({
                where: { id: booking.data },
            });

            return res.status(200).json({ message: 'Réservation trouvée.', booking, services });
        } catch (error: any) {
            console.error(error);
            return res.status(500).json({ message: 'Erreur interne du serveur.' });
        }
    }
);


router.delete("/cancel/:id/:code", async (req: Request, res: Response):Promise<any> => {
    const { id, code } = req.params;

    try {
        const booking:any = await bookingModel.findOne({
            where: {
                id: id,
            },
            include: [
                {
                model: ClientModel,
                required: true,
            },
                {
                    model: PaymentModel,
                    required: true,
                }]
        }
        );

        // console.log("payment de booking : " , booking.dateTimeStart);
        // console.log("Start prestation : " , booking.dateTimeStart);

        if(!booking) {
            return res.status(404).json({ message: 'Réservation non trouvée.' });
        }


        if(booking.code !== code) {
            return res.status(403).json({ message: 'Code de confirmation invalide.' });
        }

        const now = moment().utc();
        const bookingDate = moment(booking.dateTimeStart).utc();

        const diffHours = bookingDate.diff(now, 'hours');

        if (diffHours > 24) {
            console.log("Remboursement possible");

            const refund = await stripe.refunds.create({
                payment_intent: booking.payment.paymentIntent,
            });

            if(!refund) {
                return res.status(500).json({ message: 'Erreur lors du remboursement.' });
            }
        } else {
            console.log("Remboursement non autorisé");
        }


        const deleted = await bookingModel.destroy({
            where: {
                id: id,
            },
        });

        moment().locale('fr');
        const date = moment(booking.dateTimeStart).format("dddd D MMMM [à] HH[h]mm");

        await mailService.sendCancelClient(booking.client.email, 'Votre réservation a été annulée avec succès.', 'test', {
            client: booking.client.firstname + ' ' + booking.client.lastname,
            date: date,
        });

        await mailService.sendCancelPrestataire(process.env.NODEMAILER_USER as string, 'Un rendez-vous a été annulé', 'test', {
            client: booking.client.firstname + ' ' + booking.client.lastname,
            date: date,
        })



        return res.status(200).json({ message: 'Réservation annulée avec succès.', });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erreur interne du serveur.' });
    }

})




export default router;