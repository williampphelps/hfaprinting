import { json, error } from '@sveltejs/kit';
import { SHIPPO_KEY } from '$env/static/private';
import shippo from 'shippo';

const Shippo = shippo(SHIPPO_KEY)
export async function POST({ request }) {
    const rate = await request.json();
    console.log(rate)
    let shipment = await Shippo.transaction.create({
        rate: rate.object_id,
        label_file_type: "PDF",
        async: false
    })
    return json(shipment);
}