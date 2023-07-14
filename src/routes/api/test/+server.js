import { json, error } from '@sveltejs/kit';
import sgMail from '@sendgrid/mail';
import { SENDGRID_API_KEY } from '$env/static/private';
export async function POST(event) {

    let body = await event.request.json();
    sgMail.setApiKey(SENDGRID_API_KEY);
    sgMail.send({
        to: 'williampaul@phelpsfamily.org',
        from: 'william@higherfinearts.com',
        templateId: "d-175faa7e3f37491cb9b3c7628d06b3a6",
        dynamicTemplateData: body
    })
    .then(() => {
        console.log('Email sent')
    })
    .catch((error) => {
        console.error(error)
    })
    return json({
        hello: 'world'
    })
}