import { PrismaAdapter } from '@next-auth/prisma-adapter';
import NextAuth from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';

import { db } from '@/utils/db';

export default NextAuth({
  adapter: PrismaAdapter(db),
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      profile(profile) {
        return {
          id: profile.id.toString(),
          name: profile.name || profile.login,
          email: profile.email,
          image: profile.avatar_url,
          username: profile.login,
        };
      },
    }),
  ],
  callbacks: {
    async signIn({ account }) {
      // TODO, get the username from the account, request for organisations,
      // check if user is from @bearstudio.fr
      // https://api.github.com/users/{username}/orgs
      return true;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});
