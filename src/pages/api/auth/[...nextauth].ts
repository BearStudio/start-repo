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
          scope: 'read:org,read:user,user:email',
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ account }) {
      try {
        // Create a new instance of axios so we are not bothered by the
        // interceptors.
        const instance = axios.create();
        const response = await instance.get<Array<github.Organization>>(
          'https://api.github.com/user/orgs',
          {
            headers: { Authorization: `token ${account.access_token}` },
          }
        );

        return response.data.some(
          // Using the org id in case there is a rename.
          (org) => process.env.GITHUB_ALLOWED_ORGANIZATIONS.includes(org.login)
        );
      } catch (err) {
        console.error(err);
        return false;
      }
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});
