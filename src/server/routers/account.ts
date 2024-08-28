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
    return accounts
  })
})

export const isGithubRouter = t.router({
  me: t.procedure.use(isAuthed).query(async ({ ctx }) => {
    const accounts = await ctx.db.account.findFirst({
      where: {
        user: {
          id: ctx.session?.user.id,
        },
        provider: 'github',
      }
    })
    return accounts;
  })
})

export const isGitlabRouter = t.router({
  me: t.procedure.use(isAuthed).query(async ({ ctx }) => {
    const accounts = await ctx.db.account.findFirst({
      where: {
        user: {
          id: ctx.session?.user.id,
        },
        provider: 'gitlab',
      }
    })
    return accounts;
  })
})