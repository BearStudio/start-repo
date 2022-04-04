import React from 'react';

import { Box, Button, Stack, Text } from '@chakra-ui/react';
import { signIn } from 'next-auth/react';
import { useTranslation } from 'react-i18next';
import { FiGithub, FiInfo } from 'react-icons/fi';

import { Icon } from '@/components';

export const LoginForm = ({ onSuccess = () => undefined, ...rest }: TODO) => {
  const { t } = useTranslation();

  return (
    <Stack {...rest}>
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
      <Box borderRadius="md" bg="github.100" color="github.800" p="4">
        <Text>
          <Icon icon={FiInfo} /> Only users from{' '}
          <Text as="span" fontWeight="medium">
            {process.env.NEXT_PUBLIC_GITHUB_ALLOWED_ORGANIZATIONS}
          </Text>{' '}
          GitHub organisation(s) will be able to use the application once logged
          in.
        </Text>
      </Box>
    </Stack>
  );
};
