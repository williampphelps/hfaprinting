import { json, error } from '@sveltejs/kit';
import { SECRET_STRIPE_KEY } from '$env/static/private';
import Stripe from 'stripe';

const stripe = Stripe(SECRET_STRIPE_KEY);

export async function POST(event) {

    let body = await event.request.json();

    let totalAmount = body.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    totalAmount += Number(body.shipping.amount);

    totalAmount = Math.round(totalAmount * 100)

    const paymentIntent = await stripe.paymentIntents.create({
        amount: totalAmount,
        currency: 'usd',
        capture_method: 'manual'
    });

    return json({
        clientSecret: paymentIntent.client_secret
    })
}