import { Issue } from '@prisma/client';
import { NextApiResponse } from 'next';

import { apiMethods, notFound } from '@/utils/api';
import { db } from '@/utils/db';

export default apiMethods({
  GET: {
    isPublic: false,
    handler: async (req, res: NextApiResponse<UniqueResponse<Issue>>) => {
      const { id } = req.query;
      const issue = await db.issue.findUnique({ where: { id: id.toString() } });

      res.json({ data: issue });
    },
  },
  DELETE: {
    isPublic: false,
    handler: async (req, res: NextApiResponse<UniqueResponse<Issue>>) => {
      const { id } = req.query;
      const issue = await db.issue.delete({
        where: {
          id: id.toString(),
        },
      });
      res.json({ data: issue });
    },
  },
  PATCH: {
    isPublic: false,
    handler: async (req, res: NextApiResponse<UniqueResponse<Issue>>) => {
      const id = req.query.id.toString();
      console.log({ id, body: req.body });

      const issue = await db.issue.findUnique({ where: { id } });

      if (!issue) {
        return notFound(res);
      }

      const updatedIssue = await db.issue.update({
        where: { id },
        data: {
          title: req.body.title,
          description: req.body.description,
        },
      });

      res.json({ data: updatedIssue });
    },
  },
});
