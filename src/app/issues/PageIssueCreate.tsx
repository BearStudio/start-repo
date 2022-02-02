import { Box, Button, Flex, Heading } from '@chakra-ui/react';
import { Formiz } from '@formiz/core';
import { Issue } from '@prisma/client';
import { useTranslation } from 'react-i18next';
import { useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';

import { Page, PageBottomBar, PageContent, PageTopBar } from '@/app/layout';
import { useDarkMode } from '@/hooks/useDarkMode';

import { IssueForm } from './IssueForm';
import { useIssueCreate } from './issues.service';

export const PageIssueCreate = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { colorModeValue } = useDarkMode();

  const queryClient = useQueryClient();
  const { mutate, isLoading } = useIssueCreate({
    onSuccess: () => {
      queryClient.invalidateQueries('issues');
    },
  });

  const handleOnValidSubmit = (
    values: Pick<Issue, 'title' | 'description'>
  ) => {
    mutate(values, {
      onSuccess: () => {
        navigate(-1);
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
