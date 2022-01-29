import { Box, Button, Flex } from '@chakra-ui/react';
import { Formiz } from '@formiz/core';
import { Issue } from '@prisma/client';
import { useNavigate } from 'react-router-dom';

import { Page, PageBottomBar, PageContent, PageTopBar } from '@/app/layout';

import { IssueForm } from './IssueForm';
import { useIssueCreate } from './issues.service';

export const PageIssueCreate = () => {
  const navigate = useNavigate();

  const { mutate, isLoading } = useIssueCreate();

  const handleOnValidSubmit = (
    values: Pick<Issue, 'title' | 'description'>
  ) => {
    mutate(values);
    navigate(-1);
  };

  return (
    <Page containerSize="lg" isFocusMode>
      <PageTopBar showBack onBack={() => navigate(-1)}>
        New Issue
      </PageTopBar>
      <Formiz autoForm onValidSubmit={handleOnValidSubmit}>
        <PageContent>
          <Box bg="white" shadow="md" borderRadius="md" p="4" py="6">
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
