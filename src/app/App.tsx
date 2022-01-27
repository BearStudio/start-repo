import React, { Suspense } from 'react';

import { ReactQueryDevtools } from 'react-query/devtools';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { PageLogin } from '@/app/auth/PageLogin';
import { Layout, Loader } from '@/app/layout';
import {
  AuthenticatedRouteGuard,
  PublicOnlyRouteGuard,
} from '@/app/router/guards';
import { AdminRouteGuard } from '@/app/router/guards/AdminRouteGuard';
import { Error404, ErrorBoundary } from '@/errors';

const AdminRoutes = React.lazy(() => import('@/app/admin/AdminRoutes'));
const AccountRoutes = React.lazy(() => import('@/app/account/AccountRoutes'));
const DashboardRoutes = React.lazy(
  () => import('@/app/dashboard/DashboardRoutes')
);

export const App = () => {
  return (
    <ErrorBoundary>
      <BrowserRouter basename="/app">
        <Layout>
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />

              <Route
                path="login"
                element={
                  <PublicOnlyRouteGuard>
                    <PageLogin />
                  </PublicOnlyRouteGuard>
                }
              />

              <Route
                path="account/*"
                element={
                  <ErrorBoundary>
                    <AccountRoutes />
                  </ErrorBoundary>
                }
              />

              <Route
                path="dashboard/*"
                element={
                  <AuthenticatedRouteGuard>
                    <DashboardRoutes />
                  </AuthenticatedRouteGuard>
                }
              />

              <Route
                path="admin/*"
                element={
                  <AdminRouteGuard>
                    <AdminRoutes />
                  </AdminRouteGuard>
                }
              />

              <Route path="*" element={<Error404 />} />
            </Routes>
          </Suspense>
        </Layout>
      </BrowserRouter>
      <ReactQueryDevtools />
    </ErrorBoundary>
  );
};
