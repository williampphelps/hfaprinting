import dbConnect from '$lib/server/models/dbConnect';
import Product from '$lib/server/models/Product';
import { error, json } from '@sveltejs/kit';
import {Types} from 'mongoose';

dbConnect();

export async function load({ params, url }) {
    if (Types.ObjectId.isValid(params.product)) {
        let product = await Product.findById(params.product);

        if (product) {
            return {
                product: JSON.parse(JSON.stringify(product))
            }
        }

        throw error(404, 'Product Not Found');

    }

    throw error(404, 'Product Not Found');
}