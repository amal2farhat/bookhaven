// routes/stripeRoutes.js
import express from 'express';
import Stripe from 'stripe';

const router = express.Router();
const stripe=new Stripe(process.env.STRIPE_SECRET_KEY);


// Create a payment intent
// router.post('/create-payment-intent', async (req, res) => {
    router.post('/create-checkout-session', async (req, res) => {
    const { amount } = req.body;

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount * 100, // Convert to the smallest currency unit (e.g., cents for USD)
            currency: 'usd',
            payment_method_types: ['card'],
            mode: "payment",
            success_url: "http://localhost:3000/sucess",
            cancel_url: "http://localhost:3000/cancel",
        });

        res.status(200).json({ clientSecret: paymentIntent.client_secret });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
