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
  .mutation('create', {
    input: z.object({
      name: z.string().min(1),
      description: z.string().nullish(),
      color: z.string().length(7).nullish(),
    }),
    async resolve({ input: { name, description, color }, ctx }) {
      const scope = await ctx.db.scope.create({
        data: {
          name,
          description,
          color,
        },
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
  })
  .mutation('edit', {
    input: z.object({
      id: z.string().uuid(),
      data: z.object({
        name: z.string().min(1),
        description: z.string().nullish(),
        color: z.string().length(7).nullish(),
      }),
    }),
    async resolve({ ctx, input }) {
      const { id, data } = input;

      const updatedScope = await ctx.db.scope.update({
        where: { id },
        data: {
          name: data.name,
          description: data.description,
          color: data.color,
        },
      });

      return updatedScope;
    },
  });
