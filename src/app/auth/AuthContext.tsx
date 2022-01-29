import React, { useContext } from 'react';

import { useSession } from 'next-auth/react';

interface AuthContextValue {
  isAuthenticated: boolean;
  // updateToken(string): void;
}

export const AUTH_TOKEN_KEY = 'authToken';

const AuthContext = React.createContext<AuthContextValue>(null);

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const { status } = useSession();

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: status === 'authenticated',
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
