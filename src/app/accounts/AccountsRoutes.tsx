import { Route, Routes } from 'react-router-dom';

import { Error404 } from '@/errors';

import { PageAccounts } from './PageAccounts';

const IssuesRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<PageAccounts />} />
      <Route path="*" element={<Error404 />} />
    </Routes>
  );
};

export default IssuesRoutes;
