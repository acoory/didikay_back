import {Router, Request, Response} from 'express';
import mailService from "../../infrastructure/mailer/mailService";


const router: Router = Router();

router.get("/", async (req: Request, res: Response) => {

    await mailService.sendMailConfirmation("joelle42@ethereal.email", "Test", "Test", {
        date: "2022-12-25",
        hour: "12:00",
        location: "Paris"
    });

    res.status(200).json({
        message: "Mail route"
    });
});

export default router;