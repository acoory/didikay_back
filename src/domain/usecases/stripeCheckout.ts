import dotenv from "dotenv";

const Stripe = require('stripe');

dotenv.config();



export const stripeCreatePayment = async (items: any, formData:any, booking:any) => {
    // @ts-ignore
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

   try {

       const total = items.reduce((acc:any, item:any) => acc + parseInt(item.price), 0);
       console.log("Total:", total);
       const deposit = total >= 50 ? total * 0.4 : 10;
         console.log("Deposit:", deposit);

       // @ts-ignore
       const sanitizedItems = items.map(({ description, ...rest }) => rest);

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
                        // unit_amount: 2000,
                        // items.reduce is superior to 5000 account for the 20% deposit of the total amount or is items.reduce is inferior to 5000 account for the 1000 deposit
                        unit_amount: deposit * 100,
                    },
                    quantity: 1,
             }],
             mode: 'payment',
             customer_email: formData.email,
             metadata: {
                    client: JSON.stringify(formData),
                    booking: JSON.stringify(booking),
                    services: JSON.stringify(sanitizedItems),
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