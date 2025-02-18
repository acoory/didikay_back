import {Router, Request, Response} from 'express';
import AdminService from "../../../domain/services/adminService";
import JwtService from "../../../domain/services/jwtService";

const router: Router = Router();

router.post('/create', async (req: Request, res: Response):Promise<any> => {
        const { firstname, lastname, email, password } = req.body;

        try {
            const admin = await AdminService.createAdmin({ firstname, lastname, email, password });
            return res.status(201).json(admin);
        } catch (error: any) {
            return res.status(400).json({ message: error.message });
        }
});

// login
router.post('/login', async (req: Request, res: Response):Promise<any> => {
    const { email, password } = req.body;

    try {
        const admin = await AdminService.login(email, password);

        const token = JwtService.sign(admin);

        res.cookie('token', token, {httpOnly: true, secure: false, sameSite: 'none'});
        return res.status(200).json(admin);
    } catch (error: any) {
        return res.status(400).json({ message: error.message });
    }
});

export default router;