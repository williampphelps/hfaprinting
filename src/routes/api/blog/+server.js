import { json, error } from '@sveltejs/kit';
import Blog from '$lib/server/models/Blog';
import dbConnect from '$lib/server/models/dbConnect.js';

dbConnect();
export async function GET(event) {
    let posts = await Blog.find({});
    return json({
        posts: posts
    })
}
export async function POST(event) {
    let session = await event.locals.getSession();

    if (session && session.user) {
        let body = await event.request.json();

        let newPost = await Blog.create(body);

        return json({
            post: newPost
        })
    } else {
        throw error(401, 'Not Authorized');
    }
}