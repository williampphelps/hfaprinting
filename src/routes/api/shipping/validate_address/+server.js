import { json, error } from '@sveltejs/kit';
import { SHIPPO_KEY } from '$env/static/private';
import shippo from 'shippo';

const Shippo = shippo(SHIPPO_KEY)
export async function POST({ request }) {
    const address = await request.json();
    
    let results = await Shippo.address.create(address)
    return json(results);
}