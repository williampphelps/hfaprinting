import Shop from "$lib/server/models/Shop";
import User from "$lib/server/models/User";
import dbConnect from "$lib/server/models/dbConnect";

dbConnect();

export async function load(event) {
    let session = await event.locals.getSession();
    console.log(session);

    let user = await User.findById(session?.user?.id);

    if (user) {

        let shop = await Shop.findOne({ admin: user._id });

        if (shop) {
            return {
                shop: JSON.parse(JSON.stringify(shop))
            }
        }
    }
}