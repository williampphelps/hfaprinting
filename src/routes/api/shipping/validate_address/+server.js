import { json, error } from '@sveltejs/kit';
import shippo from 'shippo';

const Shippo = shippo('shippo_test_7929d84394d6372f13f7aa2e4ce88e52074db045')
export async function POST({ request }) {
    const address = await request.json();
    
    let results = await Shippo.address.create(address)
    return json(results);
}