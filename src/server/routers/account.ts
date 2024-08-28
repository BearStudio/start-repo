import { isAuthed } from '@/server/middleware';
import { t } from '@/server/trpc';
import { z } from 'zod';

export const accountRouter = t.router({
  me: t.procedure.use(isAuthed).query(async ({ ctx }) => {
    const accounts = await ctx.db.account.findMany({
      where: {
        user: {
          id: ctx.session?.user.id,
        },
      },
    });
    return accounts
  }),
  chooseProvider: t.procedure.use(isAuthed)
  .input(z.object({
    provider: z.enum([
      'github',
      'gitlab'
    ]),
  }))
  .query(async ({ ctx, input }) => {
    const accounts = await ctx.db.account.findFirst({
      where: {
        user: {
          id: ctx.session?.user.id,
        },
        provider: input.provider,
      },
    })
    return accounts;
  }),
})
