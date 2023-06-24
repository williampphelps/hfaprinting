import { json, error } from '@sveltejs/kit';
import Product from '$lib/server/models/Product';
import dbConnect from '$lib/server/models/dbConnect.js';
import {Types} from 'mongoose';

dbConnect();
export async function GET(event) {
    if (Types.ObjectId.isValid(event.params.id)) {
        let product = await Product.findById(event.params.id);

        if (product) {
            return json({ product })
        }
    }
    throw error(404, 'Product Not Found')
}
export async function PUT(event) {
    let session = await event.locals.getSession();

    if (session && session.user) {
        let body = await event.request.json();

        let newProduct = await Product.findByIdAndUpdate(event.params.id, body);

        return json({
            product: newProduct
        })
    } else {
        throw error(401, 'Not Authorized');
    }
}