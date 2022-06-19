import { Account } from 'next-auth';

export const linkGitLabAccount = (account: Account): boolean => {
  // At the moment, we are only linking GitLab accounts, so we return true to
  // allow the currently connected GitHub user to link the GitLab account as we
  // make sure that GitHub users are only from a given set of organizations.
  return true;
};
