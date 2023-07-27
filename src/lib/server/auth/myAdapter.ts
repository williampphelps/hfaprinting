import { type Adapter } from "@auth/core/adapters";
import Account from '$lib/server/models/Account';
import dbConnect from "../models/dbConnect";
import Session from "../models/Session";
import User from '$lib/server/models/User';

dbConnect();

export function MyAdapter(config: any): Adapter {
    return {
        // implement the adapter methods
        async createUser(user) {
            return await User.create(user);
        },
        async getUser(id) {
            return await User.findById(id);
        },
        async getUserByEmail(email) {
            return await User.findOne({email});
        },
        async getUserByAccount(providerAccountId) {
            const account = await Account.findOne(providerAccountId);
            if (!account) return null
            const user = await User.findById(account.userId);
            if (!user) return null
            return await user;
        },
        async updateUser(user) {
            return await User.findByIdAndUpdate(user._id, user);
        },
        async deleteUser(userId) {
            return await User.findByIdAndDelete(userId);
        },
        async linkAccount(account) {
            return await Account.create(account);
        },
        async unlinkAccount(providerAccountId) {
            return
        },
        async getSessionAndUser(sessionToken) {
            let session = await Session.findOne({sessionToken});
            if (!session) return null
            let user = await User.findById(session.userId);
            if (!user) return null
            return { user, session }
        },
        async createSession(session) {
            return await Session.create(session);
        },
        async updateSession(session) {
            return await Session.findByIdAndUpdate(session._id, session);
        },
        async deleteSession(sessionToken) {
            return await Session.findOneAndDelete({sessionToken})
        },
        async createVerificationToken(verificationToken) {
            return
        },
        async useVerificationToken(params) {
            return
        },

    }
}