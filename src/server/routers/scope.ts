import { z } from 'zod';

import { createProtectedRouter } from '@/server/create-protected-router';
import { db } from '@/utils/db';

export const scopeRouter = createProtectedRouter()
  .query('all', {
    async resolve({ ctx }) {
      const scopes = await ctx.db.scope.findMany({
        orderBy: {
          createdAt: 'desc',
        },
      });

      return scopes;
    },
  })
  .mutation('delete', {
    input: z.string().uuid(),
    async resolve({ input: id }) {
      const scope = await db.scope.delete({
        where: {
          id,
        },
      });

      return scope;
    },
  });
