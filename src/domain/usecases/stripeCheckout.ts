import dotenv from "dotenv";

const Stripe = require('stripe');

dotenv.config();



export const stripeCreatePayment = async (items: any, formData:any, booking:any) => {
    // @ts-ignore
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

   try {

       return await stripe.checkout.sessions.create({
             payment_method_types: ['card'],
             line_items: [...items.map((item:any) => {
                 return {
                     price_data: {
                         currency: "eur",
                         product_data: {
                             name: item.name,
                         },
                         unit_amount: 0,
                     },
                     quantity: 1,
                 }
             }),{
                    price_data: {
                        currency: "eur",
                        product_data: {
                            name: "Acompte",
                        },
                        unit_amount: 2000,
                    },
                    quantity: 1,
             }],
             mode: 'payment',
             customer_email: formData.email,
             metadata: {
                    client: JSON.stringify(formData),
                    booking: JSON.stringify(booking),
                    services: JSON.stringify(items),
             },
             success_url: `${process.env.SERVER_URL}/api/client/stripe/verify-payment/{CHECKOUT_SESSION_ID}`,
             cancel_url: `${process.env.CLIENT_URL}/cancel`,
         });
   } catch (error) {
       console.error("Error creating checkout session:", error);
       // @ts-ignore
         return { error: error.message };
   }
}