import { createProtectedRouter } from '@/server/create-protected-router';

export const accountRouter = createProtectedRouter().query('me', {
  async resolve({ ctx }) {
    const accounts = await ctx.db.account.findMany({
      where: {
        user: {
          id: ctx.session?.user.id,
        },
      },
    });

    return accounts;
  },
});
