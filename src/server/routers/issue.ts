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
  });
