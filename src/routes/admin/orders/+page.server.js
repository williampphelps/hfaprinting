import dbConnect from '$lib/server/models/dbConnect';
import Order from '$lib/server/models/Order';
import { error, json } from '@sveltejs/kit';

dbConnect();

export async function load() {

    let orders = await Order.find({}).sort({ "created": -1 });

    
    if (orders) {
        return {
            orders: JSON.parse(JSON.stringify(orders))
        }
    }

    throw error(404, 'Orders Not Found');
}