import {Router, Request, Response} from 'express';
import bookingRepository from "../../domain/repositories/bookingRepository";
import getAvailableSlots from "../../domain/usecases/getAvailableSlots";
import mailRepository from "../../domain/repositories/mailRepository";


const router: Router = Router();

router.get("/", async (req: Request, res: Response) => {
    try {

        const bookingData = await bookingRepository.findAll();

        const date = new Date('2024-12-25'); // TODO: Remplacer
        const createSlot = await getAvailableSlots(date, bookingData);

        res.status(200).json({
            message: "All bookings", booking: createSlot
        });

    } catch (error: any) {
        res.status(400).json({
            message: error.message
        });
    }
});

router.post("/create", async (req: Request, res: Response):Promise<any> => {
    const { dateTimeStart, dateTimeEnd, userId } = req.body;

    if (!dateTimeStart || !dateTimeEnd || !userId) {
        return res.status(400).json({ message: 'Les champs dateTimeStart, dateTimeEnd et userId sont requis.' });
    }

    try {
        const parsedDateStart = new Date(dateTimeStart);
        const parsedDateEnd = new Date(dateTimeEnd);

        if (isNaN(parsedDateStart.getTime()) || isNaN(parsedDateEnd.getTime())) {
            return res.status(400).json({ message: 'Les dates fournies sont invalides.' });
        }

        // Vérifie si le créneau est disponible
        const date = new Date('2024-12-25'); // TODO: Remplacer
        const availableSlots = await getAvailableSlots(date,parsedDateStart);
        const isSlotAvailable = availableSlots.some(
            (slot) =>
                slot.dateTimeStart.getTime() === parsedDateStart.getTime() &&
                slot.dateTimeEnd.getTime() === parsedDateEnd.getTime()
        );

        if (!isSlotAvailable) {
            return res.status(409).json({ message: 'Le créneau demandé n\'est pas disponible.' });
        }

        // Crée une nouvelle réservation
        const booking: any = await bookingRepository.createBooking(parsedDateStart, parsedDateEnd, userId);

        // send mail confirmation
        await mailRepository.sendMail(booking.id, booking.userId);


        return res.status(201).json({ message: 'Réservation effectuée avec succès.', booking });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erreur interne du serveur.' });
    }
});

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

export default router;