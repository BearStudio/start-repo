import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { NextAuthOptions } from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import GitLabProvider from 'next-auth/providers/gitlab';

import { linkGitHubAccount } from '@/lib/linkGitHubAccount';
import { linkGitLabAccount } from '@/lib/linkGitLabAccount';
import { db } from '@/utils/db';

export const authOptions: NextAuthOptions = {
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
    GitLabProvider({
      clientId: process.env.GITLAB_CLIENT_ID,
      clientSecret: process.env.GITLAB_CLIENT_SECRET,
    }),
  ],
  pages: {
    signIn: '/app/login',
  },
  callbacks: {
    async signIn({ account, user, ...args }) {
      if (account.provider === 'gitlab') {
        return linkGitLabAccount(account);
      }

      return linkGitHubAccount(account);
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
};
