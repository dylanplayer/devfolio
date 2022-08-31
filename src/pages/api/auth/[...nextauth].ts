import { NextApiRequest, NextApiResponse } from 'next';
import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from "next-auth/providers/google"

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  theme: {
    colorScheme: "dark",
    logo: '/images/logo.svg',
  },
  debug: false,
  pages: {
    error: '/login',
  },
  callbacks: {
    async signIn({ account, profile }:any) {
      if (account.provider === "google") {
        return profile.email_verified && profile.email == process.env.ADMIN_EMAIL;
      }
      return true
    },
  }
};

export default NextAuth(authOptions);
