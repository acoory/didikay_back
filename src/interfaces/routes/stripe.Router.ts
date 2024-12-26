import { Router, Request, Response } from 'express';
import {stripeCheckout} from "../../domain/usecases/stripeCheckout";
import {stripeVerifyPayment} from "../../domain/usecases/stripeVerifyPayment";


const router: Router = Router();

router.get("/create-checkout-session", async (req: Request, res: Response): Promise<any> => {
    try {
        console.log("Stripe Secret Key:", process.env.STRIPE_SECRET_KEY);

        // const { item } = req.body;

        const item = {
            price: 500,
            name: "Test Product",
        }

        const checkoutPayment = await stripeCheckout(item);

        res.redirect(303, checkoutPayment.url);
    } catch (error) {
        console.error("Error creating checkout session:", error);
        // @ts-ignore
        res.status(500).json({ error: error.message });
    }
});

router.post("/verify-payment/:sessionId", async (req: Request, res: Response): Promise<void> => {
    try {
        const { sessionId } = req.params;

        const paymentIntent = await stripeVerifyPayment(sessionId);

        if (typeof paymentIntent === "string") {
            res.redirect(303, paymentIntent);
        }
    } catch (error) {
        console.error("Error verifying payment:", error);
        // @ts-ignore
        res.status(500).json({ error: error.message });
    }
});


export default router;
