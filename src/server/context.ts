import * as trpc from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';
import { getServerSession } from 'next-auth/next';

import { authOptions } from '@/lib/auth';
import { db } from '@/utils/db';

export const createContext = async ({
  req,
  res,
}: trpcNext.CreateNextContextOptions) => {
  const session = await getServerSession({ req, res }, authOptions);

  return {
    req,
    res,
    db,
    session,
  };
};

export type Context = trpc.inferAsyncReturnType<typeof createContext>;
