import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Stack,
  Text,
} from '@chakra-ui/react';
import { Form } from '@formiz/core';
import { FiTag } from 'react-icons/fi';
import { VscIssues } from 'react-icons/vsc';

import { SuggestedScope } from '@/app/issues/defaultData';
import {
  DataListCell,
  DataListRow,
  FieldCheckboxes,
  FieldCheckboxesCheckAll,
  FieldCheckboxesItem,
  Icon,
} from '@/components';
import { generateSwatch } from '@/utils/colors';

export const DefaultSelectableScope = ({
  scope,
  form,
}: {
  scope: SuggestedScope;
  form: Form;
}) => {
  return (
    <AccordionItem border="none">
      <FieldCheckboxes name={scope.name}>
        <DataListRow>
          <DataListCell colWidth="3rem">
            <FieldCheckboxesCheckAll />
          </DataListCell>
          <DataListCell colWidth="3rem" p="0">
            <Icon
              icon={FiTag}
              fontSize="1.5rem"
              color={
                scope.color ? generateSwatch(scope.color)['500'] : 'brand.500'
              }
            />
          </DataListCell>
          <DataListCell>
            <Stack spacing="0">
              <Text fontWeight="bold">{scope.name}</Text>
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
            <AccordionButton>
              <AccordionIcon />
            </AccordionButton>
          </DataListCell>
        </DataListRow>
        <AccordionPanel>
          {scope.issues.map((issue) => (
            <DataListRow key={scope.name + issue.name}>
              <DataListCell colWidth="1rem" position="relative" zIndex="2">
                <FieldCheckboxesItem
                  name={`${scope.name}.${issue.name}`}
                  value={issue}
                  _before={{
                    content: '""',
                    position: 'absolute',
                    inset: '-1rem',
                  }}
                />
              </DataListCell>
              <DataListCell colWidth="3rem" align="flex-end" p="0">
                <Icon icon={VscIssues} fontSize="1.5rem" color="brand.500" />
              </DataListCell>
              <DataListCell colWidth={2}>
                <Stack spacing={{ base: '1', md: '0' }}>
                  <Text
                    fontWeight="bold"
                    align={{ base: 'left', md: undefined }}
                  >
                    {issue.name}
                  </Text>
                  <Text
                    align={{ base: 'left', md: undefined }}
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
        </AccordionPanel>
      </FieldCheckboxes>
    </AccordionItem>
  );
};
