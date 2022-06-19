import axios from 'axios';
import { Account } from 'next-auth';

import { db } from '@/utils/db';

export const linkGitHubAccount = async (account: Account): Promise<boolean> => {
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
};
