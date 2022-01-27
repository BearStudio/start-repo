import { Role } from '@prisma/client';
import { useSession } from 'next-auth/react';

import { Error403, ErrorBoundary } from '@/errors';

export const AdminRouteGuard = ({ children }) => {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return null;
  }

  if (session?.user?.role === Role.USER) {
    return <Error403 />;
  }

  return <ErrorBoundary>{children}</ErrorBoundary>;
};
