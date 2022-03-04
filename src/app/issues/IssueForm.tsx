import { Stack } from '@chakra-ui/react';
import { Scope } from '@prisma/client';

import { FieldInput, FieldMarkdown, FieldMultiSelect } from '@/components';

export type FieldSelectScopeOptions = {
  label: Scope['name'];
  value: Scope['id'];
};

export const IssueForm = () => {
  const { scopes, isLoading: isLoadingScopes }: TODO = {
    scopes: [],
    isLoading: false,
  };

  const options: Array<FieldSelectScopeOptions> = scopes?.map((scope) => ({
    label: scope.name,
    value: scope.id,
  }));

  return (
    <Stack>
      <FieldInput
        name="title"
        label="Title"
        required="Title is required"
        autoFocus
      />
      <FieldMultiSelect
        label="Scopes"
        name="scopes"
        selectProps={{
          isLoading: isLoadingScopes,
        }}
        required="Required"
        options={options}
      />
      <FieldMarkdown
        name="description"
        label="Description"
        helper="Markdown allowed"
      />
    </Stack>
  );
};
