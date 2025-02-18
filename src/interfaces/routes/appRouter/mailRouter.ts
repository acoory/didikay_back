import {Router, Request, Response} from 'express';
import mailService from "../../../infrastructure/mailer/mailService";


const router: Router = Router();

router.get("/", async (req: Request, res: Response) => {

    await mailService.sendMailConfirmation("joelle42@ethereal.email", "Test", "Test", {
        client: "Joelle",
        date: "2022-12-25",
        code: "123456",
        cancelUrl: "https://www.google.com",
        services: [
            {
                id: 1,
                name: "Service 1",
                duration_minutes: 60
            },
            {
                id: 2,
                name: "Service 2",
                duration_minutes: 30
            }
        ]
        // hour: "12:00",
        // location: "Paris"
    });

    res.status(200).json({
        message: "Mail route"
    });
});

export default router;