import React from 'react';

import { Box, Stack } from '@chakra-ui/react';
import { Role } from '@prisma/client';
import { useSession } from 'next-auth/react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink, useLocation } from 'react-router-dom';

import { useLayoutContext } from '@/app/layout';
import { useRtl } from '@/hooks/useRtl';

const MainMenuItem = ({ to, ...rest }: any) => {
  const { rtlValue } = useRtl();
  const { navOnClose } = useLayoutContext();
  const { pathname } = useLocation();
  const isActive = pathname.startsWith(to);
  return (
    <Box
      as={RouterLink}
      to={to}
      bg="transparent"
      justifyContent="flex-start"
      position="relative"
      opacity={isActive ? 1 : 0.8}
      fontWeight="bold"
      borderRadius="md"
      px="4"
      py="2"
      _active={{ bg: 'gray.700' }}
      _hover={{
        bg: 'gray.900',
        _after: {
          opacity: 1,
          w: '2rem',
        },
      }}
      _focus={{
        outline: 'none',
        bg: 'gray.900',
        _after: {
          opacity: 1,
          w: '2rem',
        },
      }}
      _after={{
        opacity: isActive ? 1 : 0,
        content: '""',
        position: 'absolute',
        insetStart: { base: 8, md: '50%' },
        bottom: '0.2em',
        transform: rtlValue('translateX(-50%)', 'translateX(50%)'),
        transition: '0.2s',
        w: isActive ? '2rem' : 0,
        h: '2px',
        borderRadius: 'full',
        bg: 'currentColor',
      }}
      onClick={navOnClose}
      {...rest}
    />
  );
};

export const MainMenu = ({ ...rest }) => {
  const { t } = useTranslation();
  const { data: session } = useSession();

  return (
    <Stack direction="row" spacing="1" {...rest}>
      <MainMenuItem to="/dashboard">
        {t('layout:mainMenu.dashboard')}
      </MainMenuItem>
      {session?.user?.role === Role.ADMIN && (
        <MainMenuItem to="/admin">{t('layout:mainMenu.admin')}</MainMenuItem>
      )}
    </Stack>
  );
};
