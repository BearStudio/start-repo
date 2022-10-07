import React, { Suspense } from 'react';

import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { PageLogin } from '@/app/auth/PageLogin';
import { Layout, Loader } from '@/app/layout';
import {
  AuthenticatedRouteGuard,
  PublicOnlyRouteGuard,
} from '@/app/router/guards';
import { Error404, ErrorBoundary } from '@/errors';

const IssuesRoutes = React.lazy(() => import('@/app/issues/IssuesRoutes'));
const ScopesRoutes = React.lazy(() => import('@/app/scopes/ScopesRoutes'));
const AccountsRoutes = React.lazy(
  () => import('@/app/accounts/AccountsRoutes')
);

export const App = () => {
  return (
    <ErrorBoundary>
      <BrowserRouter basename="/app">
        <Layout>
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route path="/" element={<Navigate to="/issues" replace />} />

              <Route
                path="login"
                element={
                  <PublicOnlyRouteGuard>
                    <PageLogin />
                  </PublicOnlyRouteGuard>
                }
              />

              <Route
                path="issues/*"
                element={
                  <AuthenticatedRouteGuard>
                    <IssuesRoutes />
                  </AuthenticatedRouteGuard>
                }
              />

              <Route
                path="scopes/*"
                element={
                  <AuthenticatedRouteGuard>
                    <ScopesRoutes />
                  </AuthenticatedRouteGuard>
                }
              />

              <Route
                path="accounts/*"
                element={
                  <AuthenticatedRouteGuard>
                    <AccountsRoutes />
                  </AuthenticatedRouteGuard>
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
