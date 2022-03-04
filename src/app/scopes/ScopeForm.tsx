import { Box, HStack, Stack, Tag, useToken } from '@chakra-ui/react';
import { useForm } from '@formiz/core';
import { isPattern } from '@formiz/validations';

import { FieldColor, FieldInput, FieldTextarea } from '@/components';
import { generateSwatch } from '@/utils/colors';

export const ScopeForm = () => {
  const form = useForm();
  const brandColor = useToken('colors', 'brand.500');
  return (
    <Stack>
      <FieldInput
        name="name"
        label="Name"
        required="Name is required"
        autoFocus
      />
      <FieldTextarea name="description" label="Description" />
      <FieldColor
        name="color"
        label={
          <HStack>
            <Box>Color</Box>
            <Tag
              color={generateSwatch(form.values?.color ?? brandColor)[700]}
              bg={generateSwatch(form.values?.color ?? brandColor)[100]}
              _dark={{
                color: generateSwatch(form.values?.color ?? brandColor)[50],
                bg: generateSwatch(form.values?.color ?? brandColor)[700],
              }}
            >
              {form.values?.name ?? 'Scope'}
            </Tag>
          </HStack>
        }
        validations={[
          {
            rule: isPattern('^#[a-fA-F0-9]{6}$'),
            message: 'Must be an hexadecimal color',
          },
        ]}
      />
    </Stack>
  );
};
