import { apiMethods, badRequest, getPagination } from '@/utils/api';
import { db } from '@/utils/db';

export default apiMethods({
  GET: {
    isPublic: false,
    handler: async (req, res) => {
      const { skip, take = 1000 } = getPagination(req);

      const issues = await db.issue.findMany({
        skip,
        take,
        orderBy: {
          createdAt: 'desc',
        },
      });

      const total = await db.issue.count();

      res.json({
        data: issues,
        pagination: {
          total,
          pages: Math.ceil(total / skip),
        },
      });
    },
  },
  POST: {
    isPublic: false,
    handler: async (req, res) => {
      if (!req.body) {
        return badRequest(res);
      }
      const courses = await db.issue.create({
        data: {
          title: req.body.title,
          description: req.body.description,
        },
      });
      res.json({ data: courses });
    },
  },
});
