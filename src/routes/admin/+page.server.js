import { error, redirect } from "@sveltejs/kit";
import dbConnect from "$lib/server/models/dbConnect";
import Shop from '$lib/server/models/Shop';
import User from '$lib/server/models/User';
import { SECRET_STRIPE_KEY } from '$env/static/private';
import Stripe from 'stripe';
import { PUBLIC_DOMAIN } from "$env/static/public";

const stripe = Stripe(SECRET_STRIPE_KEY);

dbConnect();

export async function load(event) {
    let session = await event.locals.getSession();
    console.log(session);

    let user = await User.findById(session?.user?.id);

    if (user) {

        let shop = await Shop.findOne({ admin: user._id });

        if (shop) {

            if (shop.stripe_account && shop.stripe_account != '') {

                const stripe_account = await stripe.accounts.retrieve(shop.stripe_account);

                if (!stripe_account.charges_enabled) {
                    console.log('chareges not enabled')
                    const accountLink = await stripe.accountLinks.create({
                        account: shop.stripe_account,
                        refresh_url: PUBLIC_DOMAIN + '/admin',
                        return_url: PUBLIC_DOMAIN + '/admin',
                        type: 'account_onboarding'
                    });

                    console.log(accountLink);

                    throw redirect(307, accountLink.url);
                }

                return {
                    shopFound: true,
                    shop: JSON.parse(JSON.stringify(shop))
                }

            } else {

                console.log('Createing new account')
                const stripe_account = await stripe.accounts.create({
                    type: 'express',
                    country: 'US',
                    email: user.email,
                    capabilities: {
                        card_payments: { requested: true },
                        transfers: { requested: true }
                    },
                    business_type: 'individual'
                });

                await Shop.findByIdAndUpdate(shop._id, { stripe_account: stripe_account.id });

                const accountLink = await stripe.accountLinks.create({
                    account: stripe_account.id,
                    refresh_url: PUBLIC_DOMAIN + '/admin',
                    return_url: PUBLIC_DOMAIN + '/admin',
                    type: 'account_onboarding'
                });

                console.log(accountLink);

                throw redirect(307, accountLink.url);

            }
        } else {
            return {
                shopFound: false,
                shop: {}
            }
        }
    } else {
        throw error(500, 'Server Error: User Not Found')
    }
}