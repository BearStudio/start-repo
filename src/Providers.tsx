import { ChakraProvider } from '@chakra-ui/react';
import { SessionProvider } from 'next-auth/react';
import { useTranslation } from 'react-i18next';

import { AuthProvider } from '@/app/auth/AuthContext';
import '@/config';
import theme from '@/theme';

import { AVAILABLE_LANGUAGES } from './constants/i18n';

export const Providers = ({ children }) => {
  const { i18n } = useTranslation();

  return (
    <SessionProvider>
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
    </SessionProvider>
  );
};
