import { useState } from 'react';

import { Box, Button, HStack, Heading, Stack, Text } from '@chakra-ui/react';
import { FiPlus, FiUpload } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import { Page, PageContent } from '@/app/layout';
import { DataList, DataListCell, DataListRow } from '@/components';
import { SearchInput } from '@/components/SearchInput';

import { useIssueList } from './issues.service';

export const PageIssues = () => {
  const [search, setSearch] = useState('');
  const { issues, isLoading } = useIssueList();

  return (
    <Page containerSize="full">
      <PageContent>
        <Stack spacing={8}>
          <HStack gap="4" align="center">
            <Heading size="md">Issues</Heading>
            <Box flex="1">
              <SearchInput
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
            <Button leftIcon={<FiUpload />} variant="@primary" isDisabled>
              Populate Repository
            </Button>
          </HStack>
          <DataList>
            {issues?.map((issue) => (
              <DataListRow key={issue.id}>
                <DataListCell>
                  <Stack spacing="0">
                    <Text fontWeight="bold">{issue.title}</Text>
                    <Text color="gray.500">{issue.description}</Text>
                  </Stack>
                </DataListCell>
              </DataListRow>
            ))}
          </DataList>
        </Stack>
      </PageContent>
    </Page>
  );
};
