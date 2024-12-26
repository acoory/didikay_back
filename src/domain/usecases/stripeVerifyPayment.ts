const Stripe = require('stripe');

import dotenv from "dotenv";

dotenv.config();

export const stripeVerifyPayment  = async (paymentIntentId: string):Promise<void | string> => {

    try {
        const paymentIntent = await Stripe.paymentIntents.retrieve(paymentIntentId);

        if(paymentIntent.status == "paid") {
            console.log("Payment intent is paid");
            return "/success";
        }

        console.log("Payment intent is not paid");
        return "/cancel";

    } catch (error) {
        console.error("Error verifying payment intent:", error);
        // @ts-ignore
        return error.message;
    }
}