import {
  Box,
  Button,
  Flex,
  Heading,
  LinkBox,
  LinkOverlay,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import { Formiz } from '@formiz/core';
import { Scope } from '@prisma/client';
import { useTranslation } from 'react-i18next';
import { VscIssues } from 'react-icons/vsc';
import { Link, useNavigate, useParams } from 'react-router-dom';

import {
  Loader,
  Page,
  PageBottomBar,
  PageContent,
  PageTopBar,
} from '@/app/layout';
import { DataList, DataListCell, DataListRow, Icon } from '@/components';
import { Error404 } from '@/errors';
import { useDarkMode } from '@/hooks/useDarkMode';
import { trpc } from '@/utils/trpc';

import { ScopeForm } from './ScopeForm';

export const PageScopeUpdate = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();
  const { colorModeValue } = useDarkMode();

  const { data: issues } = trpc.issue.getByScopeId.useQuery({ id: id ?? '' });

  const {
    data: scope,
    isFetching,
    isError,
  } = trpc.scope.detail.useQuery(
    { id: id ?? '' },
    {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    }
  );

  const trpcContext = trpc.useContext();
  const { mutate, isLoading } = trpc.scope.edit.useMutation();

  const handleOnValidSubmit = (
    values: Pick<Scope, 'name' | 'description' | 'color'>
  ) => {
    mutate(
      { id: id ?? '', data: { ...values } },
      {
        onSuccess: () => {
          navigate(-1);

          return trpcContext.scope.all.invalidate();
        },
      }
    );
  };

  return (
    <Page containerSize="lg" isFocusMode>
      <PageTopBar showBack onBack={() => navigate(-1)}>
        <Heading size="md">{t('scopes:update.title')}</Heading>
      </PageTopBar>
      {isFetching && <Loader />}
      {isError && !isFetching && <Error404 />}
      {!isError && !isFetching && (
        <Formiz
          autoForm
          onValidSubmit={handleOnValidSubmit}
          initialValues={{
            ...scope,
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
              <ScopeForm />

              <Text mt={3} mb={1}>
                Issues
              </Text>
              <DataList>
                {issues === undefined || issues.length === 0 ? (
                  <VStack
                    flexGrow={1}
                    alignItems="center"
                    justifyContent="center"
                    spacing={0}
                  >
                    <Text>No issue assigned to this scope.</Text>
                    <Link to={`/issues/create/?scope=${scope?.id}`}>
                      Create the first one !
                    </Link>
                  </VStack>
                ) : undefined}
                {issues?.map((issue) => (
                  <DataListRow as={LinkBox} key={issue.id}>
                    <DataListCell colWidth="3rem" align="flex-end" p="0">
                      <Icon
                        icon={VscIssues}
                        fontSize="1.5rem"
                        color="brand.500"
                      />
                    </DataListCell>
                    <DataListCell colWidth="auto">
                      <Stack spacing="0">
                        <Text fontWeight="bold">
                          <LinkOverlay
                            as={Link}
                            to={`/issues/${issue.id}`}
                            textDecoration="underline"
                          >
                            {issue.title}
                          </LinkOverlay>
                        </Text>
                        <Text
                          fontSize="sm"
                          color="gray.500"
                          _dark={{ color: 'gray.400' }}
                          noOfLines={2}
                        >
                          {issue.description}
                        </Text>
                      </Stack>
                    </DataListCell>
                  </DataListRow>
                ))}
              </DataList>
            </Box>
          </PageContent>
          <PageBottomBar>
            <Flex justifyContent="space-between">
              <Button type="button" onClick={() => navigate(-1)}>
                Cancel
              </Button>
              <Button variant="@primary" type="submit" isLoading={isLoading}>
                Update Scope
              </Button>
            </Flex>
          </PageBottomBar>
        </Formiz>
      )}
    </Page>
  );
};
