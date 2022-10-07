import { GetInferenceHelpers } from '@trpc/server';

import { accountRouter } from '@/server/routers/account';
import { issueRouter } from '@/server/routers/issue';
import { scopeRouter } from '@/server/routers/scope';
import { t } from '@/server/trpc';

export const appRouter = t.router({
  issue: issueRouter,
  account: accountRouter,
  scope: scopeRouter,
});

export type AppRouter = typeof appRouter;

export type AppRouterTypes = GetInferenceHelpers<AppRouter>;
