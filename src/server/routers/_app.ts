import superjson from 'superjson';

import { createRouter } from '@/server/create-router';

import { issueRouter } from './issue';

export const appRouter = createRouter()
  .transformer(superjson)
  .merge('issue.', issueRouter);

export type AppRouter = typeof appRouter;
