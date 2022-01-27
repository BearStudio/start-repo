import { Heading, Stack, Text } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import { useTranslation } from 'react-i18next';

import { AccountNav } from '@/app/account/AccountNav';
import { Page, PageContent } from '@/app/layout';
import { useDarkMode } from '@/hooks/useDarkMode';

export const PageProfile = () => {
  const { t } = useTranslation();
  const { colorModeValue } = useDarkMode();
  const { data: session } = useSession();

  return (
    <Page nav={<AccountNav />}>
      <PageContent>
        <Heading size="md" mb="4">
          {t('account:profile.title')}
        </Heading>
        {session && (
          <Stack
            direction="column"
            bg={colorModeValue('white', 'blackAlpha.400')}
            p="6"
            borderRadius="lg"
            spacing="6"
            shadow="md"
          >
            <Text>{session?.user?.name}</Text>
            <Text>{session?.user?.email}</Text>
          </Stack>
        )}
      </PageContent>
    </Page>
  );
};
