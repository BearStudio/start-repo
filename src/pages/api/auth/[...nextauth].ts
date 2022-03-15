import { PrismaAdapter } from '@next-auth/prisma-adapter';
import axios from 'axios';
import NextAuth from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';

import { db } from '@/utils/db';

export default NextAuth({
  adapter: PrismaAdapter(db),
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      authorization: {
        url: 'https://github.com/login/oauth/authorize',
        params: {
          // The read:org scope is required to get the user's orgs that are
          // private.
          scope: 'read:org,read:user,user:email,repo',
        },
      },
    }),
  ],
  pages: {
    signIn: '/app/login',
  },
  callbacks: {
    async signIn({ account }) {
      try {
        // Create a new instance of axios so we are not bothered by the
        // interceptors.
        const instance = axios.create();
        const response: TODO = await instance.get<Array<github.Organization>>(
          'https://api.github.com/user/orgs',
          {
            headers: { Authorization: `token ${account.access_token}` },
          }
        );

        const isAuthorized = response.data.some(
          // Using the org id in case there is a rename.
          (org) => process.env.GITHUB_ALLOWED_ORGANIZATIONS?.includes(org.login)
        );

        if (!isAuthorized) {
          return false;
        }

        // This is to update the provider account on sign in. This does not
        // exist in NextAuth yet.
        const existingAccount = await db.account.findUnique({
          where: {
            provider_providerAccountId: {
              provider: account.provider,
              providerAccountId: account.providerAccountId,
            },
          },
        });

        if (!!existingAccount) {
          await db.account.update({
            where: {
              provider_providerAccountId: {
                provider: account.provider,
                providerAccountId: account.providerAccountId,
              },
            },
            data: account,
          });
        }

        return isAuthorized;
      } catch (err) {
        console.error(err);
        return false;
      }
    },
    async session({ session, user: u }) {
      const user = await db.user.findFirst({
        where: {
          id: u.id,
        },
        include: {
          accounts: true,
        },
      });

      session.user = user;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});
