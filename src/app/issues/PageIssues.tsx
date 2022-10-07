import { FC, useEffect, useState } from 'react';

import {
  Box,
  Button,
  Center,
  Checkbox,
  Grid,
  HStack,
  Heading,
  IconButton,
  LinkBox,
  LinkOverlay,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  MenuProps,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverFooter,
  PopoverTrigger,
  Portal,
  Slide,
  Spinner,
  Stack,
  Tag,
  Text,
  Wrap,
  useDisclosure,
  useToken,
} from '@chakra-ui/react';
import { Formiz } from '@formiz/core';
import { Issue, Scope, ScopesOnIssues } from '@prisma/client';
import { useTranslation } from 'react-i18next';
import { FiDownload, FiEdit, FiPlus, FiTrash2, FiX } from 'react-icons/fi';
import { VscIssues } from 'react-icons/vsc';
import { Link } from 'react-router-dom';

import { EmptyState } from '@/app/issues/EmptyState';
import { Page, PageContent } from '@/app/layout';
import { useFieldSelectScopeStyles } from '@/app/scopes/useFieldSelectScopeStyles';
import {
  ActionsButton,
  ConfirmMenuItem,
  ConfirmPopover,
  DataList,
  DataListCell,
  DataListFooter,
  DataListRow,
  FieldMultiSelect,
  FieldSelect,
  Icon,
  useToastError,
} from '@/components';
import { SearchInput } from '@/components/SearchInput';
import { generateSwatch } from '@/utils/colors';
import { trpc } from '@/utils/trpc';

import { ExportModal } from './ExportModal';
import { FieldSelectScopeOptions } from './IssueForm';

type IssueActionsProps = {
  issue: Issue;
} & Omit<MenuProps, 'children'>;

const IssueActions: FC<IssueActionsProps> = ({ issue, ...rest }) => {
  const { t } = useTranslation();
  const toastError = useToastError();

  const trpcContext = trpc.useContext();
  const { mutate: issueRemove, ...issueRemoveData } =
    trpc.issue.delete.useMutation({
      onSuccess: () => {
        return trpcContext.issue.infinite.invalidate();
      },

      onError: () => {
        toastError({
          title: t('issues:feedbacks.deleteIssueError.title'),
          description: t('issues:feedbacks.deleteIssueError.description', {
            title: issue.title,
          }),
        });
      },
    });
  const removeIssue = () => issueRemove(issue.id);
  const isRemovalLoading = issueRemoveData.isLoading;

  return (
    <Menu isLazy placement="left-start" {...rest}>
      <MenuButton as={ActionsButton} isLoading={isRemovalLoading} />
      <Portal>
        <MenuList>
          <MenuItem
            as={Link}
            to={issue.id}
            icon={<Icon icon={FiEdit} fontSize="lg" color="gray.400" />}
          >
            {t('actions.edit')}
          </MenuItem>
          <MenuDivider />
          <ConfirmMenuItem
            icon={<Icon icon={FiTrash2} fontSize="lg" color="gray.400" />}
            onClick={removeIssue}
          >
            {t('actions.delete')}
          </ConfirmMenuItem>
        </MenuList>
      </Portal>
    </Menu>
  );
};

export const PageIssues = () => {
  const { t } = useTranslation();
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState<{ scopes: string[] } | null>(null);
  const [selectedIssues, setSelectedIssues] = useState<string[]>([]);

  const brandColor = useToken('colors', 'brand.500');
  const { isOpen, onClose, onOpen } = useDisclosure();

  const trpcContext = trpc.useContext();

  const { data, isLoading, isFetching, fetchNextPage, hasNextPage } =
    trpc.issue.infinite.useInfiniteQuery(
      { search, limit: 20, filters },
      {
        getNextPageParam: (lastPage) => lastPage.nextCursor,
      }
    );

  const issues = data?.pages.reduce(
    (
      acc: (Issue & { scopes: (ScopesOnIssues & { scope: Scope })[] })[],
      page
    ) => [...acc, ...page.issues],
    []
  );

  const totalCount = data?.pages[0]?.totalCount;

  const { mutate: addBulkScope, isLoading: isLoadingAddBulkScope } =
    trpc.issue.addBulkScope.useMutation({
      onSuccess: async () => {
        trpcContext.issue.infinite.invalidate();
        setSelectedIssues([]);
      },
    });
  const { mutate: deleteMany, isLoading: isLoadingDeleteMany } =
    trpc.issue.deleteMany.useMutation({
      onSuccess: async () => {
        trpcContext.issue.infinite.invalidate();
        setSelectedIssues([]);
      },
    });

  const { data: scopes, isLoading: isLoadingScopes } = trpc.scope.all.useQuery({
    search: '',
  });

  // Reset selected on search
  useEffect(() => {
    setSelectedIssues([]);
  }, [search]);

  const scopeOptions: Array<FieldSelectScopeOptions> =
    scopes?.map((scope) => ({
      label: scope.name,
      value: scope.id,
      color: scope.color,
    })) ?? [];

  const styles = useFieldSelectScopeStyles();

  return (
    <Page containerSize="lg" pb={!!selectedIssues.length ? 24 : undefined}>
      <PageContent>
        <Stack>
          <Grid
            templateColumns={{ base: '1fr', sm: '1fr 2fr', md: '1fr 3fr 1fr' }}
            gap={4}
            alignItems="center"
          >
            <Heading size="md">Issues</Heading>
            <Stack
              gridColumnStart={{ base: 1, sm: 2, md: 3 }}
              direction={{ base: 'column', sm: 'row' }}
              justify="flex-end"
            >
              <Button
                leftIcon={<FiDownload />}
                variant="@secondary"
                isDisabled={issues?.length === 0}
                onClick={() => onOpen()}
              >
                Export Issues
              </Button>
              <Button
                leftIcon={<FiPlus />}
                variant="@primary"
                as={Link}
                to="create"
              >
                Issue
              </Button>
            </Stack>

            <HStack
              gridRowStart={{ base: 3, sm: 2, md: 1 }}
              gridColumnStart={{ base: 1, md: 2 }}
              gridColumnEnd={{ base: 1, sm: 3, md: 2 }}
            >
              <Popover isLazy>
                {({ onClose }) => (
                  <>
                    <PopoverTrigger>
                      <Button
                        colorScheme={filters ? 'brand' : undefined}
                        variant="link"
                        display="flex"
                        p="2"
                        flex="none"
                      >
                        Filters
                        <Box
                          w="2"
                          h="2"
                          flex="none"
                          borderRadius="full"
                          bg={filters ? 'brand.600' : 'transparent'}
                          ml="2"
                        />
                      </Button>
                    </PopoverTrigger>

                    <PopoverContent>
                      <Formiz
                        autoForm
                        initialValues={filters ?? {}}
                        onValidSubmit={(values: { scopes: string[] }) => {
                          setFilters({ scopes: values.scopes ?? null });
                          onClose();
                        }}
                      >
                        <PopoverArrow />
                        <PopoverBody>
                          <FieldMultiSelect
                            placeholder="Select scopes..."
                            name="scopes"
                            autoFocus
                            options={scopeOptions}
                            selectProps={{
                              isLoading: isLoadingScopes,
                              autoFocus: true,
                              styles,
                            }}
                          />
                        </PopoverBody>
                        <PopoverFooter>
                          <HStack justify="space-between">
                            <Button
                              size="sm"
                              onClick={() => {
                                setFilters(null);
                                onClose();
                              }}
                            >
                              Clear
                            </Button>
                            <Button variant="@primary" size="sm" type="submit">
                              Filter
                            </Button>
                          </HStack>
                        </PopoverFooter>
                      </Formiz>
                    </PopoverContent>
                  </>
                )}
              </Popover>
              <SearchInput
                onChange={(value) => setSearch(value ?? '')}
                value={search}
              />
            </HStack>
          </Grid>
          {isLoading && (
            <Center flex="1">
              <Spinner />
            </Center>
          )}
          {!isLoading && !search && !issues?.length && (
            <EmptyState layerStyle="card" />
          )}
          {!isLoading && !!search && !issues?.length && (
            <Center flex="1">
              <Text>No results for '{search}'</Text>
            </Center>
          )}
          {!isLoading && !!issues?.length && (
            <>
              <Stack>
                <HStack px="3" minH="2rem">
                  <Checkbox
                    _before={{
                      content: '""',
                      position: 'absolute',
                      inset: '-1rem',
                    }}
                    isDisabled={!issues?.length}
                    isChecked={
                      !!issues?.length &&
                      selectedIssues.length === issues?.length
                    }
                    isIndeterminate={
                      selectedIssues.length > 0 &&
                      selectedIssues.length !== issues?.length
                    }
                    onChange={() =>
                      setSelectedIssues(
                        selectedIssues.length !== issues?.length
                          ? issues?.map(({ id }) => id) ?? []
                          : []
                      )
                    }
                  >
                    {selectedIssues.length < 1
                      ? 'Select all issues'
                      : `${selectedIssues.length} selected issues`}
                  </Checkbox>

                  <Portal>
                    <Slide
                      direction="bottom"
                      unmountOnExit
                      in={selectedIssues.length > 0}
                      style={{ zIndex: 10 }}
                    >
                      <HStack
                        w="60ch"
                        mx="auto"
                        mb="4"
                        maxW="90vw"
                        p="3"
                        spacing="4"
                        borderRadius="md"
                        boxShadow="2xl"
                        bg="white"
                        color="gray.800"
                        _dark={{
                          color: 'white',
                          bg: 'gray.700',
                        }}
                      >
                        <IconButton
                          size="sm"
                          variant="ghost"
                          icon={<FiX />}
                          aria-label="Clear selection"
                          onClick={() => setSelectedIssues([])}
                        />
                        <Stack
                          flex="1"
                          direction={{ base: 'column', md: 'row' }}
                          align={{ md: 'center' }}
                        >
                          <Text flex="1" textAlign="right">
                            {selectedIssues.length} selected issues
                          </Text>
                          <HStack justify="end">
                            <ConfirmPopover
                              onConfirm={() => deleteMany(selectedIssues)}
                              confirmText="Delete"
                              confirmVariant="@danger"
                              message={`You are about to delete ${selectedIssues.length} issues`}
                            >
                              <Button
                                variant="ghost"
                                size="sm"
                                isLoading={isLoadingDeleteMany}
                              >
                                {t('actions.delete')}
                              </Button>
                            </ConfirmPopover>
                            <Popover isLazy>
                              {({ onClose }) => (
                                <>
                                  <PopoverTrigger>
                                    <Button variant="@primary" size="sm">
                                      Assign scope
                                    </Button>
                                  </PopoverTrigger>

                                  <PopoverContent>
                                    <Formiz
                                      autoForm
                                      onValidSubmit={(values: {
                                        scope: string;
                                      }) => {
                                        addBulkScope({
                                          scopeId: values.scope,
                                          ids: selectedIssues,
                                        });
                                      }}
                                    >
                                      <PopoverArrow />
                                      <PopoverBody>
                                        <FieldSelect
                                          placeholder="Select scope..."
                                          name="scope"
                                          autoFocus
                                          options={scopeOptions}
                                          selectProps={{
                                            isLoading: isLoadingScopes,
                                            autoFocus: true,
                                            menuPlacement: 'top',
                                            styles,
                                          }}
                                          required="Scope is required"
                                        />
                                      </PopoverBody>
                                      <PopoverFooter>
                                        <HStack justify="space-between">
                                          <Button size="sm" onClick={onClose}>
                                            Cancel
                                          </Button>
                                          <Button
                                            variant="@primary"
                                            size="sm"
                                            type="submit"
                                            isLoading={isLoadingAddBulkScope}
                                          >
                                            Assign
                                          </Button>
                                        </HStack>
                                      </PopoverFooter>
                                    </Formiz>
                                  </PopoverContent>
                                </>
                              )}
                            </Popover>
                          </HStack>
                        </Stack>
                      </HStack>
                    </Slide>
                  </Portal>
                </HStack>
                <DataList>
                  {!isLoading &&
                    issues?.map((issue) => (
                      <DataListRow as={LinkBox} key={issue.id}>
                        <DataListCell
                          colWidth="1rem"
                          position="relative"
                          zIndex="2"
                        >
                          <Checkbox
                            _before={{
                              content: '""',
                              position: 'absolute',
                              inset: '-1rem',
                            }}
                            isChecked={
                              !!selectedIssues.find((id) => id === issue.id)
                            }
                            onChange={(e) =>
                              setSelectedIssues((s) => {
                                if (e.target.checked) {
                                  return [
                                    ...s.filter((id) => id !== issue.id),
                                    issue.id,
                                  ];
                                } else {
                                  return s.filter((id) => id !== issue.id);
                                }
                              })
                            }
                          />
                        </DataListCell>
                        <DataListCell colWidth="3rem" align="flex-end" p="0">
                          <Icon
                            icon={VscIssues}
                            fontSize="1.5rem"
                            color="brand.500"
                          />
                        </DataListCell>
                        <DataListCell colWidth={2}>
                          <Stack spacing="0">
                            <Text fontWeight="bold">
                              <LinkOverlay as={Link} to={issue.id}>
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
                        <DataListCell>
                          <Wrap>
                            {issue.scopes?.map(({ scope }) => (
                              <Tag
                                key={scope.id}
                                color={
                                  generateSwatch(scope.color ?? brandColor)[700]
                                }
                                bg={
                                  generateSwatch(scope.color ?? brandColor)[100]
                                }
                                _dark={{
                                  color: generateSwatch(
                                    scope.color ?? brandColor
                                  )[50],
                                  bg: generateSwatch(
                                    scope.color ?? brandColor
                                  )[700],
                                }}
                              >
                                {scope.name}
                              </Tag>
                            ))}
                          </Wrap>
                        </DataListCell>
                        <DataListCell align="flex-end" colWidth="4rem">
                          <IssueActions issue={issue} />
                        </DataListCell>
                      </DataListRow>
                    ))}
                  <DataListFooter justifyContent="space-between" px="4">
                    <Text>
                      <Text as="span" fontWeight="bold">
                        {issues?.length}
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
            </>
          )}
        </Stack>

        {isOpen && <ExportModal onClose={onClose} initialValues={filters} />}
      </PageContent>
    </Page>
  );
};
