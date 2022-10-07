import { TRPCError } from '@trpc/server';

import { t } from '@/server/trpc';

export const isAuthed = t.middleware(({ ctx, next }) => {
  if (!ctx.session) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }

  return next({
    ctx,
  });
});
