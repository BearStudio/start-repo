import { Route, Routes } from 'react-router-dom';

import { Error404 } from '@/errors';

import { PageScopeCreate } from './PageScopeCreate';
import { PageScopeUpdate } from './PageScopeUpdate';
import { PageScopes } from './PageScopes';

const ScopesRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<PageScopes />} />
      <Route path="create" element={<PageScopeCreate />} />
      <Route path=":id" element={<PageScopeUpdate />} />
      <Route path="*" element={<Error404 />} />
    </Routes>
  );
};

export default ScopesRoutes;
