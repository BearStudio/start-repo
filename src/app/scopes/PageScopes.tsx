import { FC, useState } from 'react';

import {
  Button,
  Center,
  Grid,
  Heading,
  LinkBox,
  LinkOverlay,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  MenuProps,
  Portal,
  Spinner,
  Stack,
  Text,
} from '@chakra-ui/react';
import { Scope } from '@prisma/client';
import { useTranslation } from 'react-i18next';
import { FiEdit, FiPlus, FiTag, FiTrash2 } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import { Page, PageContent } from '@/app/layout';
import {
  ActionsButton,
  ConfirmMenuItem,
  DataList,
  DataListCell,
  DataListFooter,
  DataListRow,
  Icon,
  useToastError,
} from '@/components';
import { SearchInput } from '@/components/SearchInput';
import { generateSwatch } from '@/utils/colors';
import { trpc } from '@/utils/trpc';

type ScopeActionsProps = {
  scope: Scope;
} & Omit<MenuProps, 'children'>;

const ScopeActions: FC<ScopeActionsProps> = ({ scope, ...rest }) => {
  const { t } = useTranslation();
  const toastError = useToastError();

  const trpcContext = trpc.useContext();
  const { mutate: scopeRemove, ...scopeRemoveData } =
    trpc.scope.delete.useMutation({
      onSuccess: () => {
        return trpcContext.scope.infinite.invalidate();
      },
      onError: () => {
        toastError({
          title: t('scopes:feedbacks.deleteScopeError.title'),
          description: t('scopes:feedbacks.deleteScopeError.description', {
            name: scope.name,
          }),
        });
      },
    });

  const removeScope = () => scopeRemove(scope.id);
  const isRemovalLoading = scopeRemoveData.isLoading;

  return (
    <Menu isLazy placement="left-start" {...rest}>
      <MenuButton as={ActionsButton} isLoading={isRemovalLoading} />
      <Portal>
        <MenuList>
          <MenuItem
            as={Link}
            to={scope.id}
            icon={<Icon icon={FiEdit} fontSize="lg" color="gray.400" />}
          >
            {t('actions.edit')}
          </MenuItem>
          <MenuDivider />
          <ConfirmMenuItem
            icon={<Icon icon={FiTrash2} fontSize="lg" color="gray.400" />}
            onClick={removeScope}
          >
            {t('actions.delete')}
          </ConfirmMenuItem>
        </MenuList>
      </Portal>
    </Menu>
  );
};

export const PageScopes = () => {
  const [search, setSearch] = useState('');

  const { data, isLoading, isFetching, fetchNextPage, hasNextPage } =
    trpc.scope.infinite.useInfiniteQuery(
      { search, limit: 20 },
      {
        getNextPageParam: (lastPage) => lastPage.nextCursor,
      }
    );

  const scopes = data?.pages.reduce(
    (previousValue: Scope[], currentValue) => [
      ...previousValue,
      ...currentValue.scopes,
    ],
    []
  );

  const totalCount = data?.pages[0]?.totalCount;

  return (
    <Page containerSize="lg">
      <PageContent>
        <Stack spacing={8}>
          <Grid
            templateColumns={{ base: '1fr', sm: '1fr 2fr', md: '1fr 3fr 1fr' }}
            gap={4}
            alignItems="center"
          >
            <Heading size="md">Scopes</Heading>
            <Stack
              gridColumnStart={{ base: 1, sm: 2, md: 3 }}
              direction={{ base: 'column', sm: 'row' }}
              justify="flex-end"
            >
              <Button
                leftIcon={<FiPlus />}
                variant="@primary"
                as={Link}
                to="create"
              >
                Scope
              </Button>
            </Stack>

            <SearchInput
              gridRowStart={{ base: 3, sm: 2, md: 1 }}
              gridColumnStart={{ base: 1, md: 2 }}
              gridColumnEnd={{ base: 1, sm: 3, md: 2 }}
              onChange={(value) => setSearch(value ?? '')}
              value={search}
            />
          </Grid>
          <DataList>
            {isLoading && (
              <Center flex="1">
                <Spinner />
              </Center>
            )}
            {!isLoading && !search && !scopes?.length && (
              <Center flex="1">
                <Text>No scopes</Text>
              </Center>
            )}
            {!isLoading && !!search && !scopes?.length && (
              <Center flex="1">
                <Text>No results for '{search}'</Text>
              </Center>
            )}
            {!isLoading &&
              scopes?.map((scope) => (
                <DataListRow as={LinkBox} key={scope.id}>
                  <DataListCell colWidth="3rem" align="flex-end" p="0">
                    <Icon
                      icon={FiTag}
                      fontSize="1.5rem"
                      color={
                        scope.color
                          ? generateSwatch(scope.color)['500']
                          : 'brand.500'
                      }
                    />
                  </DataListCell>
                  <DataListCell>
                    <Stack spacing="0">
                      <Text fontWeight="bold">
                        <LinkOverlay as={Link} to={scope.id}>
                          {scope.name}
                        </LinkOverlay>
                      </Text>
                      <Text
                        fontSize="sm"
                        color="gray.500"
                        _dark={{ color: 'gray.400' }}
                        noOfLines={2}
                      >
                        {scope.description}
                      </Text>
                    </Stack>
                  </DataListCell>
                  <DataListCell align="flex-end" colWidth="4rem">
                    <ScopeActions scope={scope} />
                  </DataListCell>
                </DataListRow>
              ))}
            <DataListFooter justifyContent="space-between" px="4">
              <Text>
                <Text as="span" fontWeight="bold">
                  {scopes?.length}
                </Text>{' '}
                out of{' '}
                <Text as="span" fontWeight="bold">
                  {totalCount}
                </Text>{' '}
                issues
              </Text>
              <Button
                size="sm"
                isLoading={isLoading || isFetching}
                isDisabled={!hasNextPage}
                onClick={() => fetchNextPage()}
              >
                Load more issues
              </Button>
            </DataListFooter>
          </DataList>
        </Stack>
      </PageContent>
    </Page>
  );
};
