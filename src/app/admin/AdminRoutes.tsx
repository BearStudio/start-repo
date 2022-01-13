import React from 'react';

import { Navigate, Route, Routes } from 'react-router-dom';

import { Error404 } from '@/errors';

const AdminUsersRoutes = React.lazy(
  () => import('@/app/admin/users/AdminUsersRoutes')
);
const AdminCoursesRoutes = React.lazy(
  () => import('@/app/admin/courses/AdminCoursesRoutes')
);

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="users" replace />} />
      <Route path="users/*" element={<AdminUsersRoutes />} />
      <Route path="courses/*" element={<AdminCoursesRoutes />} />
      <Route path="*" element={<Error404 />} />
    </Routes>
  );
};

export default AdminRoutes;
