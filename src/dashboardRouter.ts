import express, {Express} from "express";
import userRoutes from './interfaces/routes/appRouter/userRouter';
import bookingRoutes from './interfaces/routes/appRouter/bookingRouter';
import {urlencoded} from 'express';
import mailRouter from "./interfaces/routes/appRouter/mailRouter";
import stripeRouter from "./interfaces/routes/appRouter/stripe.Router";
import prestationRouter from "./interfaces/routes/appRouter/prestationRouter";
import adminRouter from "./interfaces/routes/dashboardRouter/adminRouter";

const appRouter: Express = express();

// Middlewares
appRouter.use(express.json());
appRouter.use(urlencoded({extended: true}));


appRouter.use('/admin', adminRouter);

export default appRouter;
