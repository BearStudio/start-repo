import { Stack } from '@chakra-ui/react';

import { FieldInput, FieldTextarea } from '@/components';

export const IssueForm = () => {
  return (
    <Stack>
      <FieldInput name="title" label="Title" required="Title is required" />
      <FieldTextarea
        name="description"
        label="Description"
        helper="Markdown allowed"
      />
    </Stack>
  );
};
