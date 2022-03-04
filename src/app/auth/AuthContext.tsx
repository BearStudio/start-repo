import React, { useContext } from 'react';

import { useSession } from 'next-auth/react';

interface AuthContextValue {
  isAuthenticating: boolean;
  isAuthenticated: boolean;
}

export const AUTH_TOKEN_KEY = 'authToken';

const AuthContext = React.createContext<AuthContextValue>(null as TODO);

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const { status } = useSession();

  return (
    <AuthContext.Provider
      value={{
        isAuthenticating: status === 'loading',
        isAuthenticated: status === 'authenticated',
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
