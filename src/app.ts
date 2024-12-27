import express, {Express} from "express";
import userRoutes from './interfaces/routes/userRouter';
import bookingRoutes from './interfaces/routes/bookingRouter';
import {urlencoded} from 'express';
import mailRouter from "./interfaces/routes/mailRouter";
import stripeRouter from "./interfaces/routes/stripe.Router";
import prestationRouter from "./interfaces/routes/prestationRouter";

const app: Express = express();

// Middlewares
app.use(express.json());
app.use(urlencoded({extended: true}));


app.use('/user', userRoutes);
app.use('/booking', bookingRoutes);
app.use('/mail', mailRouter);
app.use("/stripe", stripeRouter);
app.use("/prestation", prestationRouter);

export default app;
