import { z } from 'zod';

import { isAuthed } from '@/server/middleware';
import { t } from '@/server/trpc';

export const accountRouter = t.router({
  me: t.procedure
    .use(isAuthed)
    .input(
      z.object({
        provider: z.enum(['github', 'gitlab']),
      })
    )
    .query(async ({ ctx, input }) => {
      const account = await ctx.db.account.findFirst({
        where: {
          user: {
            id: ctx.session?.user.id,
          },
          provider: input.provider,
        },
      });
      return account;
    }),
});
