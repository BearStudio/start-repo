import { apiMethods, badRequest } from '@/utils/api';
import { db } from '@/utils/db';

export default apiMethods({
  POST: {
    isPublic: false,
    handler: async (req, res) => {
      const { scopes } = req.body;

      if (!scopes) {
        return badRequest(res);
      }

      const issues = await db.issue.findMany({
        where: {
          scopes: {
            some: {
              scopeId: { in: scopes },
            },
          },
        },
      });

      const body = issues.reduce(
        (accumulator, current) =>
          accumulator +
          `"${current.title.replace(/"/g, '""')}","${(
            current.description ?? ''
          ).replace(/"/g, '""')}"\n`,
        '"title","description"\n'
      );

      res.setHeader('Content-Type', 'text/csv').status(200).send(body);
    },
  },
});
