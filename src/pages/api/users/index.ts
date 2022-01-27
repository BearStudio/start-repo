import { apiMethods, getPagination } from '@/utils/api';
import { db } from '@/utils/db';

export default apiMethods({
  GET: {
    handler: async (req, res) => {
      const { skip, take } = getPagination(req);

      const users = await db.user.findMany({
        skip,
        take,
      });

      const total = await db.user.count();

      res.json({
        data: users,
        pagination: {
          total,
          pages: Math.ceil(total / skip),
        },
      });
    },
  },
});
