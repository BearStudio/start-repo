import React from 'react';

import { Box } from '@chakra-ui/react';
import { useQueryClient } from 'react-query';

import { LoginForm } from '@/app/auth/LoginForm';
import { useRedirectFromUrl } from '@/app/router';
import { Logo, SlideIn } from '@/components';
import { useDarkMode } from '@/hooks/useDarkMode';

export const PageLogin = () => {
  const { colorModeValue } = useDarkMode();
  const redirect = useRedirectFromUrl();
  const queryCache = useQueryClient();
  const onLogin = () => {
    queryCache.clear();
    redirect();
  };
  return (
    <SlideIn>
      <Box px="2" py="4rem" w="22rem" maxW="full" m="auto">
        <Logo h="3rem" mb="8" mx="auto" />
        <Box
          p="6"
          bg={colorModeValue('white', 'blackAlpha.400')}
          borderRadius="md"
          boxShadow="md"
        >
          <LoginForm onSuccess={onLogin} />
        </Box>
      </Box>
    </SlideIn>
  );
};
