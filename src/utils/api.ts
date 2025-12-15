import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';

import { authOptions } from '@/lib/auth';

type HttpVerbs = 'GET' | 'POST' | 'DELETE' | 'PATCH' | 'PUT';
type Methods = {
  [key in HttpVerbs]?: {
    isPublic?: boolean;
    handler(
      req: NextApiRequest,
      res: NextApiResponse
    ): Promise<void | NextApiResponse>;
  };
};

export const badRequest = (res: NextApiResponse) => {
  return res.status(400).end();
};

export const notSignedIn = (res: NextApiResponse, req: NextApiRequest) => {
  const provider = req.body.provider;
  if (provider !== undefined) {
    return res.status(401).json({ provider: provider });
  }

  return res.status(401).end();
};

export const notFound = (res: NextApiResponse) => {
  return res.status(404).end();
};

export const getPagination = (req: NextApiRequest) => {
  const skip =
    parseInt(req.query.page?.toString() ?? '1') *
    parseInt(req.query.size?.toString() ?? '10');
  const take = parseInt(req.query.size?.toString() ?? '10');

  return {
    skip: isNaN(skip) ? undefined : skip,
    take: isNaN(take) ? undefined : take,
  };
};

export const apiMethods =
  (methods: Methods = {}) =>
  async (req: NextApiRequest, res: NextApiResponse) => {
    const method = methods[req.method as TODO];

    if (!method) {
      return res.status(405).end();
    }

    if (!method.isPublic) {
      // getSession is now deprecated and is way slower than getServerSession because
      // it does an extra fetch out over the internet to confirm data from itself
      const session = await getServerSession(req, res, authOptions);
      const provider = req.body.provider;
      if (
        !session ||
        session.user.accounts.find((x) => x.provider === provider) === undefined // If the user doesn't have an account logged in with the given provider.
      ) {
        return notSignedIn(res, req);
      }
    }

    await new Promise((r) => setTimeout(r, 1000));

    return method.handler(req, res);
  };
