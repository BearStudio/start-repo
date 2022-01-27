import { NextApiRequest } from 'next';

import { apiMethods } from '@/utils/api';
import { db } from '@/utils/db';

export default apiMethods({
  GET: {
    handler: async (req: NextApiRequest, res) => {
      const { id } = req.query;
      const user = await db.user.findUnique({
        where: {
          id: id.toString(),
        },
      });

      res.json({
        data: user,
      });
    },
  },
});
