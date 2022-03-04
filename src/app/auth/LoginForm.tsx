import React from 'react';

import { Box, Button } from '@chakra-ui/react';
import { signIn } from 'next-auth/react';
import { useTranslation } from 'react-i18next';
import { FiGithub } from 'react-icons/fi';

export const LoginForm = ({ onSuccess = () => undefined, ...rest }: TODO) => {
  const { t } = useTranslation();

  return (
    <Box {...rest}>
      <Button
        w="full"
        colorScheme="github"
        bg="github.800"
        color="white"
        leftIcon={<FiGithub />}
        ms="auto"
        onClick={() => signIn('github')}
      >
        {t('auth:login.actions.github.login')}
      </Button>
    </Box>
  );
};
