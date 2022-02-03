import { FC, useState } from 'react';

import {
  Box,
  Button,
  HStack,
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
  Stack,
  Text,
} from '@chakra-ui/react';
import { Issue } from '@prisma/client';
import { useTranslation } from 'react-i18next';
import { FiEdit, FiPlus, FiTrash2, FiUpload } from 'react-icons/fi';
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

import { useIssueList, useIssueRemove } from './issues.service';

type IssueActionsProps = {
  issue: Issue;
} & Omit<MenuProps, 'children'>;

const IssueActions: FC<IssueActionsProps> = ({ issue, ...rest }) => {
  const { t } = useTranslation();
  const toastSuccess = useToastSuccess();
  const toastError = useToastError();

  const queryClient = useQueryClient();
  const { mutate: issueRemove, ...issueRemoveData } = useIssueRemove({
    onSuccess: (_, { title }) => {
      toastSuccess({
        title: t('issues:feedbacks.deleteIssueSuccess.title'),
        description: t('issues:feedbacks.deleteIssueSuccess.description', {
          title,
        }),
      });
      queryClient.invalidateQueries('issues');
    },
    onError: (_, { title }) => {
      toastError({
        title: t('issues:feedbacks.deleteIssueError.title'),
        description: t('issues:feedbacks.deleteIssueError.description', {
          title,
        }),
      });
    },
  });
  const removeIssue = () => issueRemove(issue);
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
  const { issues } = useIssueList();

  return (
    <Page containerSize="lg">
      <PageContent>
        <Stack spacing={8}>
          <HStack gap="4" align="center">
            <Heading size="md">Issues</Heading>
            <Box flex="1">
              <SearchInput
                isDisabled
                onChange={(value) => setSearch(value)}
                value={search}
              />
            </Box>

            <Button
              leftIcon={<FiPlus />}
              variant="@secondary"
              as={Link}
              to="create"
            >
              Create Issue
            </Button>
            <Button
              leftIcon={<FiUpload />}
              variant="@primary"
              as="a"
              href={issues?.length !== 0 ? '/api/issues/generate' : undefined}
              download="issues.csv"
              isDisabled={issues?.length === 0}
            >
              Generate GitLab CSV
            </Button>
          </HStack>
          <DataList>
            {issues?.map((issue) => (
              <DataListRow as={LinkBox} key={issue.id}>
                <DataListCell colWidth="3rem" align="flex-end" p="0">
                  <Icon icon={VscIssues} fontSize="1.5rem" color="brand.500" />
                </DataListCell>
                <DataListCell>
                  <Stack spacing="0">
                    <Text fontWeight="bold">
                      <LinkOverlay as={Link} to={issue.id}>
                        {issue.title}
                      </LinkOverlay>
                    </Text>
                    <Text color="gray.500">{issue.description}</Text>
                  </Stack>
                </DataListCell>
                <DataListCell align="flex-end">
                  <IssueActions issue={issue} />
                </DataListCell>
              </DataListRow>
            ))}
          </DataList>
        </Stack>
      </PageContent>
    </Page>
  );
};
