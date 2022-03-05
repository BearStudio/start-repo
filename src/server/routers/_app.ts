import superjson from 'superjson';

import { createRouter } from '@/server/create-router';
import { scopeRouter } from '@/server/routers/scope';

import { issueRouter } from './issue';

export const appRouter = createRouter()
  .transformer(superjson)
  .merge('issue.', issueRouter)
  .merge('scope.', scopeRouter);

export type AppRouter = typeof appRouter;
