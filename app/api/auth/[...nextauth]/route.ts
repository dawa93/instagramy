import NextAuth, { NextAuthOptions, Session } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import GoogleProvider from 'next-auth/providers/google';

import { addUser } from '@/src/service/user';

const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_OAUTH_ID || '',
      clientSecret: process.env.GOOGLE_OAUTH_SECRET || '',
    }),
  ],
  pages: {
    signIn: '/auth/signin',
    // signOut: '/auth/signout',
    // error: '/auth/error', // Error code passed in query string as ?error=
    // verifyRequest: '/auth/verify-request', // (used for check email message)
    // newUser: '/auth/new-user', // New users will be directed here on first sign in (leave the property out if not of interest)
  },
  callbacks: {
    async signIn({ user: { id, name, image, email } }) {
      if (!email) {
        return false;
      }

      addUser({
        id,
        name: name ?? '',
        image,
        email: email,
        username: email?.split('@')[0] || '',
      });

      return true;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      const user = session?.user;

      if (user) {
        return {
          ...session,
          user: {
            ...user,
            username: user.email?.split('@')[0] || '',
            id: token.id,
          },
        };
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }

      return token;
    },
  },
};

export const handler = NextAuth({
  ...authOptions,
});

export { authOptions, handler as GET, handler as POST };
