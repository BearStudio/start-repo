import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { NextAuthOptions } from 'next-auth';
import GitHubProvider, { GithubProfile } from 'next-auth/providers/github';
import GitLabProvider, { GitLabProfile } from 'next-auth/providers/gitlab';

import { linkGitLabAccount } from '@/lib/linkGitLabAccount';
import { signInGitHubAccount } from '@/lib/signInGitHubAccount';
import { db } from '@/utils/db';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID ?? '',
      clientSecret: process.env.GITHUB_CLIENT_SECRET ?? '',
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
      clientId: process.env.GITLAB_CLIENT_ID ?? '',
      clientSecret: process.env.GITLAB_CLIENT_SECRET ?? '',
      profile(profile: GitLabProfile) {
        return {
          id: profile.id.toString(),
          email: profile.email,
          image: profile.avatar_url,
          name: profile.username,
        };
      },
    }),
  ],
  pages: {
    signIn: '/app/login',
  },
  callbacks: {
    async signIn({ account, profile }) {
      if (account?.provider === 'github') {
        return signInGitHubAccount({
          account,
          profile: profile as GithubProfile,
        });
      }

      if (account?.provider === 'gitlab') {
        // TODO: will need to check for group / orgs when implementing complete
        // sign in.
        // https://github.com/BearStudio/start-repo/issues/19
        return true;
      }

      return false;
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
  events: {
    linkAccount: ({ account, profile }) => {
      if (account.provider === 'gitlab') {
        linkGitLabAccount({ account, profile });
      }
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
