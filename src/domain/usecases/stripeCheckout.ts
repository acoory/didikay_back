const Stripe = require('stripe');
import dotenv from "dotenv";

dotenv.config();


type item = {
    price: number;
    name: string;
}

export const stripeCheckout = async (item: item) => {
    // @ts-ignore
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

   try {
       if (!item || !item.name || !item.price) {
              throw new Error("Missing required fields: name and price");
       }


       if (typeof item.price !== 'number' || item.price <= 0) {
              return { error: "Price must be a positive number in cents" };
       }

       const session = await stripe.checkout.sessions.create({
           payment_method_types: ['card'],
           line_items: [
               {
                   price_data: {
                       currency: "eur",
                       product_data: {
                           name: item.name,
                       },
                       unit_amount: item.price * 100,
                   },
                   quantity: 1,
               },
           ],
           mode: 'payment',
           success_url: `${process.env.CLIENT_URL}/success`,
           cancel_url: `${process.env.CLIENT_URL}/cancel`,
       });

         return { url: session.url };
   } catch (error) {
       console.error("Error creating checkout session:", error);
       // @ts-ignore
         return { error: error.message };
   }
}