import slugify from 'slugify';

import { apiMethods, badRequest, getPagination } from '@/utils/api';
import { db } from '@/utils/db';

export default apiMethods({
  GET: {
    handler: async (req, res) => {
      const { skip, take } = getPagination(req);

      const courses = await db.course.findMany({
        skip,
        take,
        orderBy: {
          createdAt: 'desc',
        },
      });

      const total = await db.course.count();

      res.json({
        data: courses,
        pagination: {
          total,
          pages: Math.ceil(total / skip),
        },
      });
    },
  },
  POST: {
    handler: async (req, res) => {
      if (!req.body) {
        return badRequest(res);
      }
      const courses = await db.course.create({
        data: {
          name: req.body.title,
          slug: slugify(req.body.title, {
            lower: true,
          }),
          description: req.body.description,
        },
      });
      res.json({ data: courses });
    },
  },
});
