import React from 'react';

import { Box, Link } from '@chakra-ui/react';
import { useQueryClient } from '@tanstack/react-query';

import { LoginForm } from '@/app/auth/LoginForm';
import { useRedirectFromUrl } from '@/app/router';
import { Logo, SlideIn } from '@/components';
import { CREDITS } from '@/constants/credits';

export const PageLogin = () => {
  const bearstudio = CREDITS.find(({key}) => key === "BearStudio");
  const repository = CREDITS.find(({key}) => key === "GitHub");
  const redirect = useRedirectFromUrl();
  const queryCache = useQueryClient();
  const onLogin = () => {
    queryCache.clear();
    redirect();
  };
  return (
    <>
      <SlideIn>
        <Box px="2" py="4rem" w="22rem" maxW="full" m="auto">
          <Logo h="3rem" mb="8" mx="auto" />
          <Box p="6" borderRadius="md">
            <LoginForm onSuccess={onLogin} />
          </Box>
        </Box>
      </SlideIn>
      <footer>
        <Link
          color="brand.300"
          href={bearstudio?.url}
          isExternal
        >
          bearstudio.fr
        </Link>
        {' '}·{' '}
        <Link
          color="brand.300"
          href={repository?.url}
          isExternal
        >
          Source code
        </Link>
      </footer>
    </>
  );
};
