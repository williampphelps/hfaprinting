import dbConnect from '$lib/server/models/dbConnect';
import Blog from '$lib/server/models/Blog';
import { error, json } from '@sveltejs/kit';

dbConnect();

export async function load() {

    let posts = await Blog.find({}).sort({ "_id": -1 }).populate('author', 'name');
    
    if (posts) {
        return {
            posts: JSON.parse(JSON.stringify(posts))
        }
    }

    throw error(404, 'Blog Posts Not Found');
}