import { Account, User } from 'next-auth';

import { db } from '@/utils/db';

export const linkGitLabAccount = async ({
  account,
  profile,
}: {
  account: Account;
  profile: User;
}): Promise<void> => {
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
      data: {
        ...account,
        username: profile.name,
      },
    });
  }
};
