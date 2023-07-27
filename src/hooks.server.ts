import { SvelteKitAuth } from "@auth/sveltekit";
import Google from "@auth/core/providers/google";
import Credentials from "@auth/core/providers/credentials";
import { redirect, type Handle } from "@sveltejs/kit";
import { sequence } from "@sveltejs/kit/hooks";
import { decode, encode } from "@auth/core/jwt";
import { AUTH_SECRET, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, DATABASE_NAME } from '$env/static/private';
import { MyAdapter } from "$lib/server/auth/myAdapter";
import dbConnect from "$lib/server/models/dbConnect";
import User from "$lib/server/models/User";
import bcrypt from 'bcrypt';
import Account from "$lib/server/models/Account";
import { randomUUID } from 'crypto'

dbConnect();

const mongoAdapter = MyAdapter();

export const handle: Handle = sequence(
  SvelteKitAuth(async (event) => {
    const authOptions = {
      providers: [
          Google({
              clientId: GOOGLE_CLIENT_ID,
              clientSecret: GOOGLE_CLIENT_SECRET
          }),
          Credentials({
            name: "credentials",
            credentials: {
                username: { label: "Email Address", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(args) {
                let user = await User.findOne({ email: args.username });

                if (user) {
                    let account = await Account.findOne({ userId: user._id });

                    if (account && account.type == 'credentials') {
                        user.id = user._id
                        let match = await bcrypt.compare(args.password, user.password);

                        if (match) {
                            return user
                        }
                    }
                }

                return null
            }
          })
      ],
      adapter: mongoAdapter,
      callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            console.log('signIn:', { user, account, profile, email, credentials });
            if (user && credentials) {
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
        },
        async session({ session, user, token }) {
            if (user) {
                session.user.id = user.id;
                session.user.type = user.type;
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
    if (event.url.pathname.startsWith("/admin") && !event.url.pathname.startsWith('/admin/signin') && !event.url.pathname.startsWith('/admin/signup')) {
      const session = await event.locals.getSession();
      if (!session) {
        throw redirect(303, "/admin/signin");
      }
    }
    return resolve(event);
  }
);