import React from 'react';

import { Box, Button } from '@chakra-ui/react';
import { signIn } from 'next-auth/react';
import { useTranslation } from 'react-i18next';
import { FiGithub, FiGitlab } from 'react-icons/fi';

export const LoginForm = ({ onSuccess = () => undefined, ...rest }) => {
  const { t } = useTranslation();

  return (
    <Box {...rest}>
      {/* <Button
        w="full"
        colorScheme="github"
        leftIcon={<FiGithub />}
        ms="auto"
        onClick={() => signIn('github')}
      >
        {t('auth:login.actions.github.login')}
      </Button> */}
      <Button
        w="full"
        colorScheme="orange"
        leftIcon={<FiGitlab />}
        ms="auto"
        onClick={() => signIn('gitlab')}
      >
        {t('auth:login.actions.gitlab.login')}
      </Button>
    </Box>
  );
};
