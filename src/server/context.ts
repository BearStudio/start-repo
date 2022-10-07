import { inferAsyncReturnType } from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';
import { unstable_getServerSession as getServerSession } from 'next-auth/next';

import { authOptions } from '@/lib/auth';
import { db } from '@/utils/db';

export const createContext = async ({
  req,
  res,
}: trpcNext.CreateNextContextOptions) => {
  const session = await getServerSession(req, res, authOptions);

  return {
    req,
    res,
    db,
    session,
  };
};

export type Context = inferAsyncReturnType<typeof createContext>;
