import { useState } from 'react';

import { Box, Button, Flex, HStack, Heading } from '@chakra-ui/react';
import { FiPlus, FiUpload } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import { Page, PageContent } from '@/app/layout';
import { SearchInput } from '@/components/SearchInput';

export const PageIssues = () => {
  const [search, setSearch] = useState('');

  return (
    <Page containerSize="full">
      <PageContent>
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
          <Button leftIcon={<FiUpload />} variant="@primary">
            Populate Repository
          </Button>
        </HStack>
      </PageContent>
    </Page>
  );
};
