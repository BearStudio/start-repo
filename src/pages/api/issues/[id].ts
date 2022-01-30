import { apiMethods } from '@/utils/api';
import { db } from '@/utils/db';

export default apiMethods({
  DELETE: {
    isPublic: false,
    handler: async (req, res) => {
      const { id } = req.query;
      const issue = await db.issue.delete({
        where: {
          id: id.toString(),
        },
      });
      res.json({ data: issue });
    },
  },
});
