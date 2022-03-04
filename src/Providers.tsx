import { ChakraProvider } from '@chakra-ui/react';
import { SessionProvider } from 'next-auth/react';
import { useTranslation } from 'react-i18next';
import { QueryClient, QueryClientProvider } from 'react-query';

import { AuthProvider } from '@/app/auth/AuthContext';
import '@/config';
import theme from '@/theme';

import { AVAILABLE_LANGUAGES } from './constants/i18n';

const queryClient = new QueryClient();

export const Providers = ({ children }) => {
  const { i18n } = useTranslation();

  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <ChakraProvider
            theme={{
              ...theme,
              direction:
                AVAILABLE_LANGUAGES.find(({ key }) => key === i18n.language)
                  ?.dir ?? 'ltr',
            }}
          >
            {children}
          </ChakraProvider>
        </AuthProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
};
