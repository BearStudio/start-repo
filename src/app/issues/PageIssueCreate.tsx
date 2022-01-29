import { Box, Button, Flex } from '@chakra-ui/react';
import { Formiz } from '@formiz/core';
import { useNavigate } from 'react-router-dom';

import { Page, PageBottomBar, PageContent, PageTopBar } from '@/app/layout';

import { IssueForm } from './IssueForm';

export const PageIssueCreate = () => {
  const navigate = useNavigate();

  const handleOnValidSubmit = (values) => {
    console.log(values);
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
            <Button variant="@primary" type="submit">
              Create Issue
            </Button>
          </Flex>
        </PageBottomBar>
      </Formiz>
    </Page>
  );
};
