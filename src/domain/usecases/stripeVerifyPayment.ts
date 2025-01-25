import sequelize from "../../config/database";

const Stripe = require('stripe');

import dotenv from "dotenv";

dotenv.config();

export const stripeVerifyPayment  = async (sessionId: String):Promise<{ success: boolean, session: any | null }> => {

    try {
        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

        const session = await stripe.checkout.sessions.retrieve(sessionId);

        if(session.payment_status == "paid") {

            console.log("Payment intent is paid");
            console.log("Session Data:", session);
            return {
                success: true,
                session: session
            }
        }
            console.log("Payment intent is not paid");
            return {
                success: false,
                session: null
            }


    } catch (error) {
        console.error("Error verifying payment intent:", error);
        // @ts-ignore
        return error.message;
    }
}