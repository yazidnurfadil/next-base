/* eslint-disable @typescript-eslint/no-unsafe-argument */

/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import type { NextAuthConfig } from "next-auth";

import NextAuth, { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { decodeJWT } from "@/utils/text";

// declare module "next-auth" {
//   /**
//    * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
//    */
//   interface Session {
//     user: {
//       /** The user's postal address. */
//       address: string;
//       /**
//        * By default, TypeScript merges new interface properties and overwrites existing ones.
//        * In this case, the default session user properties will be overwritten,
//        * with the new ones defined above. To keep the default session user properties,
//        * you need to add them back into the newly declared interface.
//        */
//     } & DefaultSession["user"];
//   }
// }

class InvalidLoginError extends CredentialsSignin {
  code = "Invalid identifier or password";
}

export const BASE_PATH = "/api/auth";

export const config = {
  debug: true,
  basePath: BASE_PATH,
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    jwt({ user, token }) {
      return { ...token, ...user };
    },
  },
  providers: [
    Credentials({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        password: { type: "password", label: "Password" },
        email: {
          type: "email",
          label: "Email",
          placeholder: "example@domain.com",
        },
      },
      authorize: async (credentials) => {
        try {
          // You need to provide your own logic here that takes the credentials
          // submitted and returns either a object representing a user or value
          // that is false/null if the credentials are invalid.
          // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
          // You can also use the `req` object to obtain additional parameters
          // (i.e., the request IP address)
          // If no error and we have user data, return it
          const res = await fetch("/v1/api/auth", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
          });
          const jwtRes = await res.json();
          if (jwtRes.accessToken) {
            const user = decodeJWT(jwtRes.accessToken);
            return { ...user.payload, apiToken: jwtRes.accessToken };
          } else {
            throw new InvalidLoginError();
          }
        } catch {
          // Return null if user data could not be retrieved
          return null;
        }
      },
    }),
  ],
} satisfies NextAuthConfig;

// Use it in server contexts
export const { auth, signIn, signOut, handlers } = NextAuth(config);
