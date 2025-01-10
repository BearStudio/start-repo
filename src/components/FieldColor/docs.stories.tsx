import React from 'react';

import { Button } from '@chakra-ui/react';
import { Formiz, useForm } from '@formiz/core';

import { FieldColor } from '.';

export default {
  title: 'Fields/FieldColor',
};

export const Default = () => {
  const form = useForm({ onValuesChange: console.log });

  return (
    <Formiz connect={form} autoForm>
      <FieldColor name="color" label="Color" />
      <Button type="submit">Submit</Button>
    </Formiz>
  );
};
