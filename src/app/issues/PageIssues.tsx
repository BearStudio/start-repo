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
  Tag,
  Text,
  Wrap,
  useDisclosure,
  useToken,
} from '@chakra-ui/react';
import { Issue } from '@prisma/client';
import { useTranslation } from 'react-i18next';
import { FiDownload, FiEdit, FiPlus, FiTrash2 } from 'react-icons/fi';
import { VscIssues } from 'react-icons/vsc';
import { useQueryClient } from 'react-query';
import { Link } from 'react-router-dom';

import { Page, PageContent } from '@/app/layout';
import {
  ActionsButton,
  ConfirmMenuItem,
  DataList,
  DataListCell,
  DataListRow,
  Icon,
  useToastError,
  useToastSuccess,
} from '@/components';
import { SearchInput } from '@/components/SearchInput';
import { generateSwatch } from '@/utils/colors';
import { TQuery, trpc } from '@/utils/trpc';

import { ExportModal } from './ExportModal';

type IssueActionsProps = {
  issue: Issue;
} & Omit<MenuProps, 'children'>;

const IssueActions: FC<IssueActionsProps> = ({ issue, ...rest }) => {
  const { t } = useTranslation();
  const toastSuccess = useToastSuccess();
  const toastError = useToastError();

  const queryClient = useQueryClient();
  const { mutate: issueRemove, ...issueRemoveData } = trpc.useMutation(
    ['issue.delete'],
    {
      onSuccess: ({ title }) => {
        toastSuccess({
          title: t('issues:feedbacks.deleteIssueSuccess.title'),
          description: t('issues:feedbacks.deleteIssueSuccess.description', {
            title,
          }),
        });

        const queryKey: TQuery = 'issue.all';
        return queryClient.invalidateQueries([queryKey]);
      },
      onError: () => {
        toastError({
          title: t('issues:feedbacks.deleteIssueError.title'),
          description: t('issues:feedbacks.deleteIssueError.description', {
            title: issue.title,
          }),
        });
      },
    }
  );
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
  const [search, setSearch] = useState('');

  const brandColor = useToken('colors', 'brand.500');
  const { isOpen, onClose, onOpen } = useDisclosure();

  const {
    data: issues,
    isLoading,
    isLoading: isLoadingPage,
  } = trpc.useQuery(['issue.all']);

  return (
    <Page containerSize="lg">
      <PageContent>
        <Stack spacing={8}>
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

            <SearchInput
              gridRowStart={{ base: 3, sm: 2, md: 1 }}
              gridColumnStart={{ base: 1, md: 2 }}
              gridColumnEnd={{ base: 1, sm: 3, md: 2 }}
              onChange={(value) => setSearch(value ?? '')}
              isLoading={isLoadingPage}
              value={search}
            />
          </Grid>
          <DataList>
            {isLoading && (
              <Center flex="1">
                <Spinner />
              </Center>
            )}
            {!isLoading && !search && !issues?.length && (
              <Center flex="1">
                <Text>No issues</Text>
              </Center>
            )}
            {!isLoading && !!search && !issues?.length && (
              <Center flex="1">
                <Text>No results for '{search}'</Text>
              </Center>
            )}
            {!isLoading &&
              issues?.map((issue) => (
                <DataListRow as={LinkBox} key={issue.id}>
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
                          color={generateSwatch(scope.color ?? brandColor)[700]}
                          bg={generateSwatch(scope.color ?? brandColor)[100]}
                          _dark={{
                            color: generateSwatch(
                              scope.color ?? brandColor
                            )[50],
                            bg: generateSwatch(scope.color ?? brandColor)[700],
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
          </DataList>
        </Stack>
        {isOpen && <ExportModal onClose={onClose} />}
      </PageContent>
    </Page>
  );
};
