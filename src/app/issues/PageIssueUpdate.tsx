import { Box, Button, Flex, Heading } from '@chakra-ui/react';
import { Formiz } from '@formiz/core';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';

import {
  Loader,
  Page,
  PageBottomBar,
  PageContent,
  PageTopBar,
} from '@/app/layout';
import { Error404 } from '@/errors';
import { useDarkMode } from '@/hooks/useDarkMode';
import { trpc } from '@/utils/trpc';

import { IssueForm } from './IssueForm';

export const PageIssueUpdate = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();
  const { colorModeValue } = useDarkMode();

  const {
    data: issue,
    isFetching,
    isError,
  } = trpc.issue.detail.useQuery(
    { id: id ?? '' },
    {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    }
  );

  const trpcContext = trpc.useContext();
  const { mutate, isLoading } = trpc.issue.edit.useMutation();

  const handleOnValidSubmit = (data: {
    title: string;
    description: string;
    scopes: string[];
  }) => {
    mutate(
      { id: id ?? '', data },
      {
        onSuccess: () => {
          navigate(-1);

          return trpcContext.issue.all.invalidate();
        },
      }
    );
  };

  const scopes = issue?.scopes?.map(({ scope }) => scope.id);

  return (
    <Page containerSize="lg" isFocusMode>
      <PageTopBar showBack onBack={() => navigate(-1)}>
        <Heading size="md">{t('issues:update.title')}</Heading>
      </PageTopBar>
      {isFetching && <Loader />}
      {isError && !isFetching && <Error404 />}
      {!isError && !isFetching && (
        <Formiz
          autoForm
          onValidSubmit={handleOnValidSubmit}
          initialValues={{
            ...issue,
            scopes,
          }}
        >
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
                Update Issue
              </Button>
            </Flex>
          </PageBottomBar>
        </Formiz>
      )}
    </Page>
  );
};
