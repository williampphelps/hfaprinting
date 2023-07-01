import dbConnect from '$lib/server/models/dbConnect';
import Blog from '$lib/server/models/Blog';
import { error, json } from '@sveltejs/kit';
import {Types} from 'mongoose';

dbConnect();

export async function load({ params, url }) {
    if (Types.ObjectId.isValid(params.post)) {
        let post = await Blog.findById(params.post).populate('author');

        if (post) {
            return {
                post: JSON.parse(JSON.stringify(post))
            }
        }

        throw error(404, 'Post Not Found');

    }

    throw error(404, 'Page Not Found');
}