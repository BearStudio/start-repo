import React from 'react';

import { Route, Routes } from 'react-router-dom';

import { PageCourses } from '@/app/admin/courses/PageCourses';
import { Error404 } from '@/errors';

const AdminUsersRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<PageCourses />} />
      <Route path="*" element={<Error404 />} />
    </Routes>
  );
};

export default AdminUsersRoutes;
