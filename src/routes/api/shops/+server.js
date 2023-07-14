import { json, error } from '@sveltejs/kit';
import Shop from '$lib/server/models/Shop';
import Product from '$lib/server/models/Product.js';
import dbConnect from '$lib/server/models/dbConnect.js';

dbConnect();
export async function POST(event) {
    let session = await event.locals.getSession();

    if (session && session.user) {
        let body = await event.request.json();

        let newShop = await Shop.create(body);

        let updatedProducts = await Product.updateMany({ store: session.user.id }, { store: newShop._id });

        console.log(updatedProducts);

        return json({
            shop: newShop
        })
    } else {
        throw error(401, 'Not Authorized');
    }
}