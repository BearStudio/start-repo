import { ErrorBoundary } from '@/errors';

export const AdminRouteGuard = ({ children }) => {
  return <ErrorBoundary>{children}</ErrorBoundary>;
};
