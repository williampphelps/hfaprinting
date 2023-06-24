import { json, error } from '@sveltejs/kit';
import dbConnect from '$lib/server/models/dbConnect.js';
import Order from '$lib/server/models/Order.js';

dbConnect();
export async function POST(event) {
    let body = await event.request.json();

    let exists = await Order.exists({ payment_intent: body.payment_intent });

    if (body.payment_intent == '') {
        return json({ error: 'No Payment Intent Provided!'})
    }

    if (exists) {
        return json({ oldOrder: exists });
    }

    let newOrder = await Order.create(body);

    return json({order: newOrder})
}