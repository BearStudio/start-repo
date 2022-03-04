import * as trpc from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';
import { z } from 'zod';

import { db } from '@/utils/db';

const appRouter = trpc.router().query('issue.all', {
  async resolve() {
    const issues = await db.issue.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        scopes: {
          include: {
            scope: true,
          },
        },
      },
    });

    return issues;
  },
});

// export type definition of API
export type AppRouter = typeof appRouter;

// export API handler
export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: () => null,
});
