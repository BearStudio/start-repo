import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface User {
    name: string;
    image: string;
    email: string;
    /** Is the user an admin ? */
    role: 'ADMIN' | 'USER';
  }
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      name: string;
      image: string;
      email: string;
      /** Is the user an admin ? */
      role: 'ADMIN' | 'USER';
    };
  }
}
