import { apiMethods } from '@/utils/api';
import { db } from '@/utils/db';

export default apiMethods({
  GET: {
    isPublic: false,
    handler: async (req, res) => {
      const issues = await db.issue.findMany();

      const body = issues.reduce(
        (accumulator, current) =>
          accumulator +
          `"${current.title.replaceAll(
            '"',
            '""'
          )}","${current.description.replaceAll('"', '""')}"\n`,
        '"title","description"\n'
      );

      res.setHeader('Content-Type', 'text/csv').status(200).send(body);
    },
  },
});
