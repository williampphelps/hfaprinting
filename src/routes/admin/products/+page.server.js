import dbConnect from '$lib/server/models/dbConnect';
import Product from '$lib/server/models/Product';
import Shop from '$lib/server/models/Shop';
import { error, json } from '@sveltejs/kit';

dbConnect();

export async function load(event) {

    let session = await event.locals.getSession();

    let shop = await Shop.findOne({ admin: session?.user.id });

    let products = await Product.find({ store: shop._id}).sort({ "_id": -1 });

    
    if (products) {
        return {
            products: JSON.parse(JSON.stringify(products))
        }
    }

    throw error(404, 'Products Not Found');
}