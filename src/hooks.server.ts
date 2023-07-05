import { SvelteKitAuth } from "@auth/sveltekit";
import Google from "@auth/core/providers/google";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "$lib/server/auth/dbConnect";
import { redirect, type Handle } from "@sveltejs/kit";
import { sequence } from "@sveltejs/kit/hooks";
import { decode, encode } from "@auth/core/jwt";
import { AUTH_SECRET, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, DATABASE_NAME } from '$env/static/private';

import process from "process";

process.on("SIGINT", function () {
    console.error('exiting...')
  process.exit();
});
process.on("SIGTERM", function () {
    console.error('exiting...')
  process.exit();
});

const mongoAdapter = MongoDBAdapter(clientPromise, {
    databaseName: DATABASE_NAME
});

export const handle: Handle = sequence(
  SvelteKitAuth(async (event) => {
    const authOptions = {
      providers: [
          Google({
              clientId: GOOGLE_CLIENT_ID,
              clientSecret: GOOGLE_CLIENT_SECRET
          })
      ],
      adapter: mongoAdapter,
      callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            if (user) {
                if (credentials) {

                    let sessionToken = randomUUID();
                    let expiryDate = new Date(Date.now() + 1000 * 60 * 30)

                    await mongoAdapter.createSession({
                        userId: user._id,
                        sessionToken: sessionToken,
                        expires: expiryDate
                    })

                    event.cookies.set('next-auth.session-token', sessionToken, {
                        expires: expiryDate
                    })
                    
                }
                return true
            }
            return false
        },
        async session({ session, user, token }) {
            if (user) {
                session.user.id = user.id;
                session.user.type = user.type;
                // if (superadmins.includes(user.email) && user.type != "superadmin") {
                //     await User.findByIdAndUpdate(user.id, { type: "superadmin" });
                //     session.user.type = "superadmin";
                // } else if (!user.type) {
                //     await User.findByIdAndUpdate(user.id, { type: "user"})
                //     session.user.type = "user";
                // }
            }
            if (token) {
                session.user = token.user;
            }
            return session;
        },
        async jwt({ token, user, account, profile, isNewUser }) {
            if (user) {
                token.user = {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    image: user.image,
                    type: user.type
                };
            }
            if (account && user) {
                token.user.provider = account.provider;
            }
            return token;
        }
      },
      session: {
          strategy: 'database'
      },
      jwt: {
          encode: async ({token, secret, maxAge}) => {
              if (token.user.provider == 'credentials') {
                  const cookie = event.cookies.get('next-auth.session-token');

                  if (cookie) return cookie; return '';
              }
              return encode({token: token, secret: secret, maxAge: maxAge});
          },
          decode: async ({token, secret}) => {
              return decode({token: token, secret: secret});
          }
      },
      pages: {
          signIn: '/admin/signin',
      },
      secret: AUTH_SECRET,
      trustHost: true
    }
    return authOptions
  }),
  async function ({event, resolve}) {
    if (event.url.pathname.startsWith("/admin") && !event.url.pathname.startsWith('/admin/signin')) {
      const session = await event.locals.getSession();
      if (!session) {
        throw redirect(303, "/admin/signin");
      }
    }
    return resolve(event);
  }
);