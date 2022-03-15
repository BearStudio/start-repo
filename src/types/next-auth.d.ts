import { Account } from '@prisma/client';
// eslint-disable-next-line
import NextAuth from 'next-auth';

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: User & {
      accounts: Account[];
    };
  }
}
