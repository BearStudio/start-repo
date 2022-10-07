import { isAuthed } from '@/server/middleware';
import { t } from '@/server/trpc';

export const accountRouter = t.router({
  me: t.procedure.use(isAuthed).query(async ({ ctx }) => {
    const accounts = await ctx.db.account.findMany({
      where: {
        user: {
          id: ctx.session?.user.id,
        },
      },
    });

    return accounts;
  }),
});
