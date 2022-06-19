import superjson from 'superjson';

import { createRouter } from '@/server/create-router';
import { accountRouter } from '@/server/routers/account';
import { issueRouter } from '@/server/routers/issue';
import { scopeRouter } from '@/server/routers/scope';

export const appRouter = createRouter()
  .transformer(superjson)
  .merge('issue.', issueRouter)
  .merge('scope.', scopeRouter)
  .merge('account.', accountRouter);

export type AppRouter = typeof appRouter;
