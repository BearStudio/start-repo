import { Box, Button, Flex, Heading } from '@chakra-ui/react';
import { Formiz } from '@formiz/core';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { Page, PageBottomBar, PageContent, PageTopBar } from '@/app/layout';
import { useToastError } from '@/components';
import { useDarkMode } from '@/hooks/useDarkMode';
import { AppRouterTypes } from '@/server/routers/_app';
import { trpc } from '@/utils/trpc';

import { IssueForm } from './IssueForm';

export const PageIssueCreate = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { colorModeValue } = useDarkMode();
  const toastError = useToastError();

  const trpcContext = trpc.useContext();
  const { mutate, isLoading } = trpc.issue.create.useMutation();

  type IssueCreate = AppRouterTypes['issue']['create'];

  const handleOnValidSubmit = (values: IssueCreate['input']) => {
    mutate(values, {
      onSuccess: () => {
        navigate(-1);

        return trpcContext.issue.all.invalidate();
      },
      onError: () => {
        toastError({
          title: 'Failed to create issue',
        });
      },
    });
  };

  return (
    <Page containerSize="lg" isFocusMode>
      <PageTopBar showBack onBack={() => navigate(-1)}>
        <Heading size="md">{t('issues:create.title')}</Heading>
      </PageTopBar>
      <Formiz autoForm onValidSubmit={handleOnValidSubmit}>
        <PageContent>
          <Box
            bg={colorModeValue('white', 'gray.900')}
            shadow="md"
            borderRadius="md"
            p="4"
            py="6"
          >
            <IssueForm />
          </Box>
        </PageContent>
        <PageBottomBar>
          <Flex justifyContent="space-between">
            <Button type="button" onClick={() => navigate(-1)}>
              Cancel
            </Button>
            <Button variant="@primary" type="submit" isLoading={isLoading}>
              Create Issue
            </Button>
          </Flex>
        </PageBottomBar>
      </Formiz>
    </Page>
  );
};
