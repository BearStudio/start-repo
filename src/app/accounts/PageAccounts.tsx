import {
  Alert,
  AlertIcon,
  Button,
  Flex,
  Heading,
  Stack,
  StackDivider,
  Text,
} from '@chakra-ui/react';
import { signIn } from 'next-auth/react';
import { useTranslation } from 'react-i18next';
import { FiGithub, FiGitlab } from 'react-icons/fi';

import { Page, PageContent } from '@/app/layout';
import { Icon } from '@/components';
import { trpc } from '@/utils/trpc';

export const PageAccounts = () => {
  const { t } = useTranslation('account');

  const { data, isLoading: areAccountsLoading } = trpc.account.me.useQuery();

  const githubAccount = data?.find((account) => account.provider === 'github');
  const gitlabAccount = data?.find((account) => account.provider === 'gitlab');

  const isLoading = areAccountsLoading;

  return (
    <Page containerSize="lg">
      <PageContent>
        <Stack>
          <Heading size="md" mb="4">
            {t('account:profile.title')}
          </Heading>
          <Stack w="full" divider={<StackDivider />}>
            <Flex flex="1" justify="space-between" alignItems="center">
              <Text>GitHub</Text>
              <Button
                leftIcon={<Icon icon={FiGithub} />}
                isDisabled={!!githubAccount}
                isLoading={isLoading}
              >
                {githubAccount ? githubAccount.username ?? 'Linked' : 'Link'}
              </Button>
            </Flex>
            <Stack>
              <Flex flex="1" justify="space-between" alignItems="center">
                <Text>GitLab</Text>
                <Button
                  leftIcon={<Icon icon={FiGitlab} />}
                  isDisabled={!!gitlabAccount}
                  isLoading={isLoading}
                  onClick={() => signIn('gitlab')}
                >
                  {gitlabAccount ? gitlabAccount.username ?? 'Linked' : 'Link'}
                </Button>
              </Flex>
              <Alert borderRadius="md" status="warning">
                <AlertIcon />
                At the moment, you can link your GitLab account but the issue
                export using GitLab API is not supported yet.
              </Alert>
            </Stack>
          </Stack>
        </Stack>
      </PageContent>
    </Page>
  );
};
