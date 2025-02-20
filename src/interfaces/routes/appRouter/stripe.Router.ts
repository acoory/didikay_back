import e, { Router, Request, Response } from 'express';
import {stripeCreatePayment} from "../../../domain/usecases/stripeCheckout";
import {stripeVerifyPayment} from "../../../domain/usecases/stripeVerifyPayment";
import clientRepository from "../../../domain/repositories/clientRepository";
import sequelize from "../../../config/database";
import bookingRepository from "../../../domain/repositories/bookingRepository";
import moment from "moment";
import 'moment/locale/fr';
import mailService from "../../../infrastructure/mailer/mailService";
import dotenv from "dotenv";
import {verifyIfSlotIsAvailable} from "../../../domain/usecases/bookingScheduleSlot";
import Stripe from "stripe";
import paymentsModels from "../../../domain/models/payments.models";
dotenv.config();


const router: Router = Router();

router.post("/create-checkout-session", async (req: Request, res: Response): Promise<any> => {
    try {
        const { formData, devis, booking } = req.body;

        if(!formData || !devis || !booking) {
            return res.status(400).json({ error: "Missing required fields: formData, devis and booking" });
        }

        console.log("Stripe Secret Key:", process.env.STRIPE_SECRET_KEY);

        // const { item } = req.body;

        const createPayment = await stripeCreatePayment(devis, formData,booking );

        return res.status(200).json({ url: createPayment.url });
        // return res.redirect(303, createPayment.url);
    //
    } catch (error) {
        console.error("Error creating checkout session:", error);
        // @ts-ignore
        res.status(500).json({ error: error.message });
    }
});

router.get("/verify-payment/:sessionId", async (req: Request, res: Response): Promise<any> => {
    try {
        const { sessionId } = req.params;

        const verifyPayment = await stripeVerifyPayment(sessionId);

        const code = Math.random().toString(36).substring(7);

        if(verifyPayment.success) {

            const transaction = await sequelize.transaction(async (t:any) => {
                const { booking, client, services } = verifyPayment.session.metadata;

                const serviceIdArray = JSON.parse(services).map((item:any) => item.id);
                const prestationDuration = JSON.parse(services).reduce((acc:any, item:any) => acc + item.duration_minutes, 0);

                const prestationStart = moment(JSON.parse(booking).start).valueOf();
                const prestationEnd = moment(JSON.parse(booking).end).add(prestationDuration, 'minutes').valueOf();

                const isAvailable = await verifyIfSlotIsAvailable(prestationStart, prestationEnd);

                if (!isAvailable) {
                    // @ts-ignore
                    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

                    await stripe.refunds.create({
                        payment_intent: verifyPayment.session.payment_intent,
                    });

                    // todo : rembourser le client
                    throw new Error('slotNotAvailable');
                }

                // 1 - Create user
                const userRepo:any = await clientRepository.createUser(JSON.parse(client), t);

                const createPayment:any = await paymentsModels.create({
                    amount: 2000,
                    deposit: 20,
                    clientId: userRepo.id,
                    paymentIntent: verifyPayment.session.payment_intent,
                });

                const bookingData = {
                    dateTimeStart: prestationStart,
                    dateTimeEnd: prestationEnd,
                    userId: userRepo.id,
                    data: serviceIdArray,
                    paymentId: createPayment.id,
                    code: code
                }

                // 2 - Create booking
                const bookingRepo:any = await bookingRepository.createBooking(bookingData, t);

                return { booking: bookingRepo, client: userRepo, payment: createPayment, services: services };
            });

            if(transaction) {

                const { client, booking, payment } = transaction

                moment().locale('fr');
                const date = moment(booking.dateTimeStart).format("dddd D MMMM [à] HH[h]mm");

                await mailService.sendMailConfirmation(client.email, "Confirmation de rendez-vous DIDIKAY", "Test", {
                    client: client.firstname + " " + client.lastname,
                    date: date,
                    code: code,
                    cancelUrl: `${process.env.CLIENT_URL}/cancel/${booking.id}`,
                    services: JSON.parse(transaction.services),
                    total: JSON.parse(transaction.services).reduce((acc:any, item:any) => acc + parseInt(item.price), 0)
                });
                // @ts-ignore
                await mailService.sendMailConfirmationPrestataire(process.env.NODEMAILER_USER, "Un nouveau rendez-vous a été pris", "Test", {
                    client: client.firstname + " " + client.lastname,
                    date: date,
                    services: JSON.parse(transaction.services)
                });
            }

            return res.redirect(303, `${process.env.CLIENT_URL}/success`);
        }

        return res.redirect(303, `${process.env.CLIENT_URL}/cancel`);

    } catch (error) {
        console.error("Error verifying payment:", error);
        // @ts-ignore

        if(error.message === 'slotNotAvailable') {
            return res.redirect(303, `${process.env.CLIENT_URL}/slot-not-available`);

            // Todo : refund client
        }
        // @ts-ignore
        res.status(500).json({ error: error.message });
    }
});


export default router;
