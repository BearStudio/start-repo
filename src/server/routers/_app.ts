import { inferRouterInputs, inferRouterOutputs } from '@trpc/server';

import { accountRouter, isGithubRouter, isGitlabRouter } from '@/server/routers/account';
import { issueRouter } from '@/server/routers/issue';
import { scopeRouter } from '@/server/routers/scope';
import { t } from '@/server/trpc';

export const appRouter = t.router({
  issue: issueRouter,
  account: accountRouter,
  githubAccount: isGithubRouter,
  gitlabAccount: isGitlabRouter,
  scope: scopeRouter,
});

export type AppRouter = typeof appRouter;

export type RouterInput = inferRouterInputs<AppRouter>;
export type RouterOutput = inferRouterOutputs<AppRouter>;
