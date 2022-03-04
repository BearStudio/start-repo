import React from 'react';

import { Button, Stack } from '@chakra-ui/react';
import { Formiz } from '@formiz/core';

import { FieldMarkdown } from './index';

export default {
  title: 'Fields/FieldMarkdown',
};

export const Default = () => (
  <Formiz onSubmit={console.log} autoForm>
    <Stack spacing={6}>
      <FieldMarkdown
        name="demo-description"
        label="Description"
        placeholder="Placeholder"
        helper="Please give a description to your project"
        required="Description is required"
      />
      <FieldMarkdown
        name="demo-read-only"
        label="Read Only"
        defaultValue="Value"
        placeholder="Placeholder"
        helper="This is an helper"
        isReadOnly
      />
      <FieldMarkdown
        name="demo-disabled"
        label="Disabled"
        defaultValue="Value"
        placeholder="Placeholder"
        helper="This is an helper"
        isDisabled
      />
      <Button type="submit">Submit</Button>
    </Stack>
  </Formiz>
);
