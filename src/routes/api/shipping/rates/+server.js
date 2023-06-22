import { json, error } from '@sveltejs/kit';
import shippo from 'shippo';

const Shippo = shippo('shippo_test_7929d84394d6372f13f7aa2e4ce88e52074db045')
export async function POST({ request }) {
    const shipping = await request.json();
    
    let shipment = await Shippo.shipment.create({
        "address_from": shipping.address_from,
        "address_to": shipping.address_to,
        "parcels": shipping.parcels,
        "async": false
    });

    console.log(shipment);
    return json(shipment)
}