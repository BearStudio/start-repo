import React from 'react';

import { Box, Link, Text } from '@chakra-ui/react';
import { useQueryClient } from '@tanstack/react-query';

import { LoginForm } from '@/app/auth/LoginForm';
import { useRedirectFromUrl } from '@/app/router';
import { Logo, SlideIn } from '@/components';
import { BEARSTUDIO_LINK, GITHUB_LINK } from '@/constants/credits';

export const PageLogin = () => {
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
      <Box as="footer" color="brand.700" _dark={{ color: 'brand.300' }} p="4">
        <Text>Made with love and hard work by the </Text>
        <Link href={BEARSTUDIO_LINK} isExternal>
          bearstudio team
        </Link>{' '}
        ·{' '}
        <Link href={GITHUB_LINK} isExternal>
          Source code
        </Link>
      </Box>
    </>
  );
};
