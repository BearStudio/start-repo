import { Route, Routes } from 'react-router-dom';

import { PageIssues } from '@/app/issues/PageIssues';
import { Error404 } from '@/errors';

import { PageIssueCreate } from './PageIssueCreate';
import { PageIssueUpdate } from './PageIssueUpdate';

const IssuesRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<PageIssues />} />
      <Route path="create" element={<PageIssueCreate />} />
      <Route path=":id" element={<PageIssueUpdate />} />
      <Route path="*" element={<Error404 />} />
    </Routes>
  );
};

export default IssuesRoutes;
