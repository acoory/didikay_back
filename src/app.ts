import express, {Express} from "express";
import userRoutes from './interfaces/routes/userRouter';
import bookingRoutes from './interfaces/routes/bookingRouter';
import {urlencoded} from 'express';

const app: Express = express();

// Middlewares
app.use(express.json());
app.use(urlencoded({extended: true}));


app.use('/user', userRoutes);
app.use('/booking', bookingRoutes);

export default app;
