import { error, json } from '@sveltejs/kit';

export async function load(event) {
    let payment_intent = await event.url.searchParams.get('payment_intent');

    return { payment_intent: payment_intent }

}