import { json, error } from '@sveltejs/kit';
import dbConnect from '$lib/server/models/dbConnect.js';
import Order from '$lib/server/models/Order.js';
import sgMail from '@sendgrid/mail';
import { SENDGRID_API_KEY } from '$env/static/private';

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

    console.log(body);

    sgMail.setApiKey(SENDGRID_API_KEY);
    sgMail.send({
        to: ['william@higherfinearts.com', 'william@phelpsfamily.org'],
        from: 'william@higherfinearts.com',
        templateId: "d-175faa7e3f37491cb9b3c7628d06b3a6",
        dynamicTemplateData: {
            first_name: body.shipping.address_to.name
        }
    }).then(() => {
        console.log('email sent')
    }).catch((error) => {
        console.log(error);
    });

    return json({order: newOrder})
}