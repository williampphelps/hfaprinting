import { json, error } from '@sveltejs/kit';
import dbConnect from '$lib/server/models/dbConnect.js';
import User from '$lib/server/models/User.js';
import Account from '$lib/server/models/Account.js';
import bcrypt from 'bcrypt';

dbConnect();
export async function POST(event) {

    let body = await event.request.json();

    let user = await User.findOne({ email: body.email });

    if (user) throw error(400, { message: 'User Already Exists'})

    let hash = await bcrypt.hash(body.password, 12);

    let newUser = await User.create({
        name: body.name,
        email: body.email,
        password: hash,
        image: 'https://api.dicebear.com/6.x/bottts-neutral/svg?seed=' + hash,
        emailVerified: false,
        type: 'user'
    });

    let newAccount = await Account.create({
        provider: 'credentials',
        type: 'credentials',
        providerAccountId: newUser._id,
        userId: newUser._id
    });

    return json({
        user: newUser,
        account: newAccount
    });

}