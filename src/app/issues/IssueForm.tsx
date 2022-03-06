import { Stack } from '@chakra-ui/react';
import { Scope } from '@prisma/client';

import { FieldInput, FieldMarkdown, FieldMultiSelect } from '@/components';
import { trpc } from '@/utils/trpc';

export type FieldSelectScopeOptions = {
  label: Scope['name'];
  value: Scope['id'];
};

export const IssueForm = () => {
  const { data: scopes, isLoading: isLoadingScopes } = trpc.useQuery([
    'scope.all',
    { search: '' },
  ]);

  const options: Array<FieldSelectScopeOptions> =
    scopes?.map((scope) => ({
      label: scope.name,
      value: scope.id,
    })) ?? [];

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
