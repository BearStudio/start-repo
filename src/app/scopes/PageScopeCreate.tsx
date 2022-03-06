import { Box, Button, Flex, Heading } from '@chakra-ui/react';
import { Formiz } from '@formiz/core';
import { Scope } from '@prisma/client';
import { useTranslation } from 'react-i18next';
import { useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';

import { Page, PageBottomBar, PageContent, PageTopBar } from '@/app/layout';
import { useToastError } from '@/components';
import { useDarkMode } from '@/hooks/useDarkMode';
import { TQuery, trpc } from '@/utils/trpc';

import { ScopeForm } from './ScopeForm';

export const PageScopeCreate = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const { colorModeValue } = useDarkMode();

  const toastError = useToastError();

  const queryClient = useQueryClient();
  const { mutate, isLoading } = trpc.useMutation('scope.create');

  const handleOnValidSubmit = (
    values: Pick<Scope, 'name' | 'description' | 'color'>
  ) => {
    mutate(values, {
      onSuccess: () => {
        navigate(-1);
        const queryKey: TQuery = 'scope.all';
        return queryClient.invalidateQueries([queryKey]);
      },
      onError: (error) => {
        toastError({
          title: error.message ?? 'An error occured',
        });
      },
    });
  };

  return (
    <Page containerSize="lg" isFocusMode>
      <PageTopBar showBack onBack={() => navigate(-1)}>
        <Heading size="md">{t('scopes:create.title')}</Heading>
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
            <ScopeForm />
          </Box>
        </PageContent>
        <PageBottomBar>
          <Flex justifyContent="space-between">
            <Button type="button" onClick={() => navigate(-1)}>
              Cancel
            </Button>
            <Button variant="@primary" type="submit" isLoading={isLoading}>
              Create Scope
            </Button>
          </Flex>
        </PageBottomBar>
      </Formiz>
    </Page>
  );
};
