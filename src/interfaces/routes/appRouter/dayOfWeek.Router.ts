import {Router, Request, Response} from 'express';
import daysOfWeekRepository from "../../../domain/repositories/daysOfWeekRepository";


const router: Router = Router();

router.get("/", async (req: Request, res: Response) => {
    const daysOfWeek = await daysOfWeekRepository.getAll();

    res.status(200).json({
        message: "All days of week", daysOfWeek: daysOfWeek
    });
});

export default router;