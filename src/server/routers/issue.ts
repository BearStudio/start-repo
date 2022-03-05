import { z } from 'zod';

import { createProtectedRouter } from '@/server/create-protected-router';
import { db } from '@/utils/db';

export const issueRouter = createProtectedRouter()
  .query('all', {
    async resolve({ ctx }) {
      const issues = await ctx.db.issue.findMany({
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
  })
  .mutation('delete', {
    input: z.string().uuid(),
    async resolve({ input: id }) {
      const issue = await db.issue.delete({
        where: {
          id,
        },
      });

      return issue;
    },
  })
  .mutation('create', {
    input: z.object({
      title: z.string(),
      description: z.string(),
      scopes: z.array(z.string().uuid()).min(1),
    }),
    async resolve({ input }) {
      const issue = await db.issue.create({
        data: {
          title: input.title,
          description: input.description,
          scopes: {
            create: input.scopes.map((id: string) => ({
              scope: {
                connect: {
                  id,
                },
              },
            })),
          },
        },
        include: {
          scopes: {
            include: {
              scope: true,
            },
          },
        },
      });

      return issue;
    },
  });
