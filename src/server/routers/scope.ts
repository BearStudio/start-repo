import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import { isAuthed } from '@/server/middleware';
import { t } from '@/server/trpc';

export const scopeRouter = t.router({
  infinite: t.procedure
    .use(isAuthed)
    .input(
      z.object({
        search: z.string(),
        limit: z.number().min(1).max(100).default(20),
        cursor: z.string().uuid().nullish(),
      })
    )
    .query(async ({ ctx, input: { search, limit, cursor } }) => {
      const scopes = await ctx.db.scope.findMany({
        take: limit + 1,
        where: {
          OR: [
            {
              name: {
                contains: search,
                mode: 'insensitive',
              },
            },
            {
              description: {
                contains: search,
                mode: 'insensitive',
              },
            },
          ],
        },
        cursor: cursor ? { id: cursor } : undefined,
        orderBy: {
          createdAt: 'desc',
        },
      });

      const totalCount = await ctx.db.scope.count({
        where: {
          name: {
            search: search !== '' ? search : undefined,
          },
          description: {
            search: search !== '' ? search : undefined,
          },
        },
      });

      let nextCursor: typeof cursor = null;
      if (scopes.length > limit) {
        const nextItem = scopes.pop();
        nextCursor = nextItem!.id;
      }

      return {
        scopes,
        nextCursor,
        totalCount,
      };
    }),
  all: t.procedure
    .use(isAuthed)
    .input(
      z.object({
        search: z.string(),
      })
    )
    .query(async ({ ctx, input: { search } }) => {
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
    }),
  detail: t.procedure
    .use(isAuthed)
    .input(
      z.object({
        id: z.string().uuid(),
      })
    )
    .query(async ({ ctx, input: { id } }) => {
      const scope = await ctx.db.scope.findUnique({
        where: { id },
      });

      return scope;
    }),
  create: t.procedure
    .use(isAuthed)
    .input(
      z.object({
        name: z.string().min(1),
        description: z.string().nullish(),
        color: z.string().length(7).nullish(),
      })
    )
    .mutation(async ({ input: { name, description, color }, ctx }) => {
      const scopeDoesExist = await ctx.db.scope.findFirst({
        where: {
          name,
        },
      });

      if (scopeDoesExist) {
        throw new TRPCError({
          code: 'CONFLICT',
          message: `A scope with the name "${name}" already exists`,
        });
      }

      const scope = await ctx.db.scope.create({
        data: {
          name,
          description,
          color,
        },
      });

      return scope;
    }),
  delete: t.procedure
    .use(isAuthed)
    .input(z.string().uuid())
    .mutation(async ({ ctx, input: id }) => {
      await ctx.db.scopesOnIssues.deleteMany({
        where: {
          scopeId: id,
        },
      });

      const scope = await ctx.db.scope.delete({
        where: {
          id,
        },
      });

      return scope;
    }),
  edit: t.procedure
    .use(isAuthed)
    .input(
      z.object({
        id: z.string().uuid(),
        data: z.object({
          name: z.string().min(1),
          description: z.string().nullish(),
          color: z.string().length(7).nullish(),
        }),
      })
    )
    .mutation(async ({ ctx, input }) => {
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
    }),
});
