import React from 'react';

import { Box, Link } from '@chakra-ui/react';
import { useQueryClient } from '@tanstack/react-query';

import { LoginForm } from '@/app/auth/LoginForm';
import { useRedirectFromUrl } from '@/app/router';
import { Logo, SlideIn } from '@/components';

export const PageLogin = () => {
  const bearstudioLink = "http://bearstudio.fr/team"
  const repositoryLink = "https://github.com/BearStudio/start-repo"
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
        <Box p="6" borderRadius="md">
          <LoginForm onSuccess={onLogin} />
        </Box>
        <Box>
        Discover {' '}
          <Link
            color="violet"
            href={bearstudioLink}
            isExternal
          >
            who we are !
          </Link>
        </Box>
        <Box>
        Look at this project {' '}
          <Link
            color="violet"
            href={repositoryLink}
            isExternal
          >
            gitHub repository !
          </Link>
        </Box>
      </Box>
    </SlideIn>
  );
};
