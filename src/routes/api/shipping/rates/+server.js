import { json, error } from '@sveltejs/kit';
import { SHIPPO_KEY } from '$env/static/private';
import shippo from 'shippo';

const Shippo = shippo(SHIPPO_KEY)
export async function POST({ request }) {
    const shipping = await request.json();
    
    let shipment = await Shippo.shipment.create({
        "address_from": shipping.address_from,
        "address_to": shipping.address_to,
        "parcels": shipping.parcels,
        "async": false
    });
    return json(shipment)
}