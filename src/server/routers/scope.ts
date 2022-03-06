import { z } from 'zod';

import { createProtectedRouter } from '@/server/create-protected-router';

export const scopeRouter = createProtectedRouter()
  .query('all', {
    input: z.object({
      search: z.string(),
    }),
    async resolve({ ctx, input: { search } }) {
      const scopes = await ctx.db.scope.findMany({
        where: {
          name: {
            search: search !== '' ? search : undefined,
          },
          description: {
            search: search !== '' ? search : undefined,
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

      return scopes;
    },
  })
  .query('detail', {
    input: z.object({
      id: z.string().uuid(),
    }),
    async resolve({ ctx, input: { id } }) {
      const scope = await ctx.db.scope.findUnique({
        where: { id },
      });

      return scope;
    },
  })
  .mutation('delete', {
    input: z.string().uuid(),
    async resolve({ ctx, input: id }) {
      const scope = await ctx.db.scope.delete({
        where: {
          id,
        },
      });

      return scope;
    },
  });
