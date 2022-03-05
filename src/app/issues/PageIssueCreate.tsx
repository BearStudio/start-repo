import { Box, Button, Flex, Heading } from '@chakra-ui/react';
import { Formiz } from '@formiz/core';
import { Issue } from '@prisma/client';
import { useTranslation } from 'react-i18next';
import { useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';

import { Page, PageBottomBar, PageContent, PageTopBar } from '@/app/layout';
import { useDarkMode } from '@/hooks/useDarkMode';
import {
  InferMutationInput,
  InferQueryInput,
  TMutation,
  TQuery,
  trpc,
} from '@/utils/trpc';

import { IssueForm } from './IssueForm';

export const PageIssueCreate = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { colorModeValue } = useDarkMode();

  const queryClient = useQueryClient();
  const { mutate, isLoading } = trpc.useMutation('issue.create');

  const handleOnValidSubmit = (values: InferMutationInput<'issue.create'>) => {
    mutate(values, {
      onSuccess: () => {
        navigate(-1);
        const queryKey: TQuery = 'issue.all';
        return queryClient.invalidateQueries([queryKey]);
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
