import dbConnect from '$lib/server/models/dbConnect';
import Product from '$lib/server/models/Product';
import { error, json } from '@sveltejs/kit';

dbConnect();

export async function load() {

    let products = await Product.find({}).sort({ "_id": -1 });

    
    if (products) {
        return {
            products: JSON.parse(JSON.stringify(products))
        }
    }

    throw error(404, 'Products Not Found');
}