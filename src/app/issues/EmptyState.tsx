import { VFC } from 'react';

import { Button, Stack, StackProps, Text } from '@chakra-ui/react';
import { FiPlus } from 'react-icons/fi';
import { VscIssues } from 'react-icons/vsc';
import { Link } from 'react-router-dom';

import { Icon } from '@/components';

export const EmptyState: VFC<StackProps> = (props) => (
  <Stack align="center" {...props}>
    <Icon icon={VscIssues} fontSize="3xl" color="brand.500" />
    <Text>You don't have any issues</Text>
    <Button
      leftIcon={<Icon icon={FiPlus} />}
      as={Link}
      to="create"
      variant="link"
      colorScheme="brand"
    >
      Create a new issue
    </Button>
  </Stack>
);
