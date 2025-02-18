import {Router, Request, Response} from 'express';
import prestationRepository from "../../../domain/repositories/prestationRepository";

const router: Router = Router();

router.get("/", async (req: Request, res: Response) => {
    try {
        // const bookingData = await bookingRepository.findAll();

        const prestationRepo = await prestationRepository.getAll();

        res.status(200).json({
            message: "All prestations", prestation: prestationRepo
        });
        // res.status(200).json({
        //     message: "All bookings", booking: bookingData
        // });
    } catch (e:any) {
        res.status(400).json({
            message: e.message
        });
    }
});

export default router;