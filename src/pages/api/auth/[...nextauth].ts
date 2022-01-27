import { PrismaAdapter } from '@next-auth/prisma-adapter';
import NextAuth from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import GitLabProvider from 'next-auth/providers/gitlab';

import { db } from '@/utils/db';

export default NextAuth({
  adapter: PrismaAdapter(db),
  providers: [
    // GitHubProvider({
    //   clientId: process.env.GITHUB_CLIENT_ID,
    //   clientSecret: process.env.GITHUB_CLIENT_SECRET,
    // }),
    GitLabProvider({
      clientId: process.env.GITLAB_CLIENT_ID,
      clientSecret: process.env.GITLAB_CLIENT_SECRET,
    }),
  ],
  // callbacks: {
  //   async session({ session, user }) {
  //     // console.log({ user });
  //     // session.user = user;
  //     return session;
  //   },
  // },
});
