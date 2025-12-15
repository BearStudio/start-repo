import React from 'react';

import { Button, Stack } from '@chakra-ui/react';
import { Formiz, useForm } from '@formiz/core';
import { isRequired } from '@formiz/validations';

import { FieldHidden } from '.';

export default {
  title: 'Fields/FieldHidden',
};

export const Default = () => {
  const form = useForm({});

  return (
    <Formiz connect={form} autoForm>
      <Stack spacing={6}>
        <FieldHidden
          name="error"
          validations={[{ handler: isRequired(), message: 'Field required' }]}
        />
        <Button type="submit">Submit</Button>
      </Stack>
    </Formiz>
  );
};
