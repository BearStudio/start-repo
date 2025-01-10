import { Stack } from '@chakra-ui/react';
import { Formiz, useForm } from '@formiz/core';

import { FieldBooleanCheckbox } from './index';

export default {
  title: 'Fields/FieldBooleanCheckbox',
};
export const Default = () => {
  const form = useForm();
  return (
    <Formiz connect={form}>
      <Stack spacing="4">
        <FieldBooleanCheckbox
          name="FieldBooleanCheckbox"
          label="Label"
          optionLabel="Option label"
          helper="Helper"
        />
        <FieldBooleanCheckbox
          name="FieldBooleanCheckbox2"
          label="Label"
          helper="Helper"
        />
      </Stack>
    </Formiz>
  );
};
