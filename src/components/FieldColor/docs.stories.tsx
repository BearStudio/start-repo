import React from 'react';

import { Button } from '@chakra-ui/react';
import { Formiz } from '@formiz/core';

import { FieldColor } from '.';

export default {
  title: 'Fields/FieldColor',
};

export const Default = () => {
  return (
    <Formiz onChange={console.log} autoForm>
      <FieldColor name="color" label="Color" />
      <Button type="submit">Submit</Button>
    </Formiz>
  );
};
