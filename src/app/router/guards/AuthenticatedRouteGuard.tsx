import { useEffect } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';

import { useAuthContext } from '@/app/auth/AuthContext';
import { Loader } from '@/app/layout';
import { ErrorBoundary } from '@/errors';

export const AuthenticatedRouteGuard = ({ children }) => {
  const { isAuthenticated, isAuthenticating } = useAuthContext();
  const { pathname, search } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticating && !isAuthenticated) {
      navigate(`/login?redirect=${encodeURIComponent(pathname + search)}`, {
        replace: true,
      });
    }
  }, [isAuthenticating, isAuthenticated, navigate, pathname, search]);

  return !isAuthenticated ? (
    <Loader />
  ) : (
    <ErrorBoundary>{children}</ErrorBoundary>
  );
};
