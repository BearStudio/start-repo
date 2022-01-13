import { NextApiRequest, NextApiResponse } from 'next';

type HttpVerbs = 'GET' | 'POST' | 'DELETE' | 'PATCH' | 'PUT';
type Methods = {
  [key in HttpVerbs]?: {
    isPublic?: boolean;
    handler(req: NextApiRequest, res: NextApiResponse): void;
  };
};

export const badRequest = (res: NextApiResponse) => {
  return res.status(400).end();
};

export const notSignedIn = (res: NextApiResponse) => {
  return res.status(401).end();
};

export const notFound = (res: NextApiResponse) => {
  return res.status(404).end();
};

export const getPagination = (req: NextApiRequest) => {
  const skip =
    parseInt(req.query.page?.toString()) * parseInt(req.query.size?.toString());
  const take = parseInt(req.query.size?.toString());

  return {
    skip: isNaN(skip) ? undefined : skip,
    take: isNaN(take) ? undefined : take,
  };
};

export const apiMethods =
  (methods: Methods = {}) =>
  async (req: NextApiRequest, res: NextApiResponse) => {
    const method = methods[req.method];

    if (!method) {
      return res.status(405).end();
    }

    await new Promise((r) => setTimeout(r, 1000));

    return method.handler(req, res);
  };
