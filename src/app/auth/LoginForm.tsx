import { Box, Button, Stack, Text } from '@chakra-ui/react';
import { signIn } from 'next-auth/react';
import { useTranslation } from 'react-i18next';
import { FiGithub, FiGitlab, FiInfo } from 'react-icons/fi';

import { Icon } from '@/components';

export const LoginForm = ({
  onSuccess = () => undefined,
  provider = 'github',
  ...rest
}: TODO) => {
  const { t } = useTranslation();

  return (
    <>
      {provider === 'github' ? (
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
              GitHub organisation(s) will be able to use the application once
              logged in.
            </Text>
          </Box>
        </Stack>
      ) : (
        <Stack>
          <Button
            w="full"
            colorScheme="gitlab"
            bg="github.800"
            color="white"
            leftIcon={<FiGitlab />}
            ms="auto"
            onClick={() => signIn('gitlab')}
          >
            {t('auth:login.actions.gitlab.login')}
          </Button>
          <Box borderRadius="md" bg="github.100" color="github.800" p="4">
            <Text>
              <Icon icon={FiInfo} /> Only users from{' '}
              <Text as="span" fontWeight="medium">
                {process.env.NEXT_PUBLIC_GITHUB_ALLOWED_ORGANIZATIONS}
              </Text>{' '}
              GitLab organisation(s) will be able to use the application once
              logged in.
            </Text>
          </Box>
        </Stack>
      )}
    </>
  );
};
